import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { generateChartOptions } from '../config'
import { useEffect, useRef, useState } from 'react';
import { Kpi, Response } from '../interface';
import axios from 'axios';

export const ViewMode = ({ kpi }: { kpi: Kpi }) => {

    const [chartOptions, setChartOptions] = useState({});

    const fetchData = async () => {
        const response = await axios.post("https://sundial-fe-interview.vercel.app/api/snapshot", {
            metric: kpi.metric,
            segmentKey: kpi.segmentKey,
            segmentId: kpi.segmentValue
        });
        console.log(response);

        const data: Response = response.data;
        const dataArr = data.data.values.map((val) => {
            return [val['date'], val["value"]];
        });

        const options = generateChartOptions(dataArr);
        setChartOptions(options);


    }
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        fetchData()
    }, [kpi]);
    return (
        <div className='flex flex-col'>
            <div className='flex justify-end'>
                <div className='w-4/5 h-1/4'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                        ref={chartComponentRef}
                    />
                </div>
            </div>
        </div>
    )
}