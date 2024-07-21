import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { generateChartOptions } from '../config'
import { useEffect, useState } from 'react';
import { Kpi, Response } from '../interface';
import axios from 'axios';

export const ViewMode = ({ kpi }: { kpi: Kpi }) => {

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});

    const fetchData = async () => {
        const response = await axios.post("https://sundial-fe-interview.vercel.app/api/snapshot", {
            metric: kpi.metric?.id,
            segmentKey: kpi.segmentKey?.id,
            segmentId: kpi.segmentValue?.id
        });
        console.log(response);

        const data: Response = response.data;
        const dataArr = data.data.values.map((val) => {
            return [val['date'], val["value"]];
        });

        const options: Highcharts.Options = generateChartOptions(dataArr);
        setChartOptions(options);


    }

    useEffect(() => {
        fetchData()
    }, [kpi]);

    if (!chartOptions.chart) {
        return <div>loading</div>
    }
    console.log(chartOptions);

    return (<div className="h-[184px]  relative">
        <div className="font-semibold text-black">
            {kpi.metric?.name || "Metric Name"} |{" "}
            {kpi.segmentValue?.name || "Segment Value"}
        </div>
        <div className='flex h-full flex-col justify-center '>

            <div className="mt-6 font-medium text-3xl">12.5k</div>
            <span className="flex">
                3.5%
                <span className="ml-2 text-[#808080]">Δ7d</span>
            </span>
        </div>
        <div className="absolute w-[60%] h-full right-0 top-0">
            <HighchartsReact
                highcharts={Highcharts}
                options={chartOptions}
                constructorType={"chart"}
                containerProps={{ className: "h-full w-full" }}
            />
        </div>
    </div>
    )
}
