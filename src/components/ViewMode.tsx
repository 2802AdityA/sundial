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
    // const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
        fetchData()
    }, [kpi]);

    if (!chartOptions.chart) {
        return <div>loading</div>
    }
    console.log(chartOptions);

    return (
        <div className="h-[10px] p-8 relative">
            <h5 className="font-medium text-[#808080]">
                {kpi.metric?.name || "segment key"} |{" "}
                {kpi.segmentValue?.name || "segment ID"}
            </h5>
            <div className="mt-6 font-medium lg:text-3xl md:text-2xl text-xl">12.5k</div>
            <span className="flex">
                {/* <Up /> */}
                3.5%
                <span className="ml-2 text-[#808080]">Δ7d</span>
            </span>
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
