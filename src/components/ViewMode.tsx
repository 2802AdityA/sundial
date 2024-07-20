import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { generateChartOptions } from '../config'
import { useEffect, useRef, useState } from 'react';
import { Kpi, Response } from '../interface';
import axios from 'axios';

export const ViewMode = ({ kpi }: { kpi: Kpi }) => {

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

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

        const options: Highcharts.Options = generateChartOptions(dataArr);
        setChartOptions(options);


    }
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        fetchData()
    }, [kpi]);

    if (!chartOptions.chart) {
        return <div>loading</div>
    }
    console.log(chartOptions);

    return (
        <div className='flex'>

            <div className=''>
                <div className='h-1/5'>

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
