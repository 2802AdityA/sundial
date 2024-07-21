import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { generateChartOptions } from '../config'
import { useEffect, useState } from 'react';
import { Kpi, Response } from '../interface';
import axios from 'axios';

export const ViewMode = ({ kpi }: { kpi: Kpi }) => {

    const [chartOptions, setChartOptions] = useState<Highcharts.Options>({});
    const [chartData, setChartData] = useState<Array<Array<string | number>>>();

    const fetchData = async () => {
        const response = await axios.post("https://sundial-fe-interview.vercel.app/api/snapshot", {
            metric: kpi.metric?.id,
            segmentKey: kpi.segmentKey?.id,
            segmentId: kpi.segmentValue?.id
        });

        const data: Response = response.data;
        const dataArr = data.data.values.map((val) => {
            return [val['date'], val["value"]];
        });

        dataArr.reverse()

        const options: Highcharts.Options = generateChartOptions(dataArr);
        setChartData(dataArr);
        setChartOptions(options);
    }

    const getNumberData = (data: string | number | undefined) => {
        data = Number(data)
        if (data >= 1000) {
            return (data / 1000).toFixed(1) + "K";
        }
        return data.toString();
    }

    const getPercentage = (data: Array<Array<string | number>> | undefined) => {
        const latestValue: number = Number(data?.at(data.length - 1)?.at(1));
        const oldestValue: number = Number(data?.at(0)?.at(1));

        const percentage: number = (latestValue - oldestValue) * 100 / (latestValue);

        return Math.abs(Number(percentage.toFixed(2)));
    }

    const compareValues = (data: Array<Array<string | number>> | undefined) => {
        const latestValue: number = Number(data?.at(data.length - 1)?.at(1));
        const oldestValue: number = Number(data?.at(0)?.at(1));
        return latestValue > oldestValue ? 1 : -1
    }

    useEffect(() => {
        fetchData()
    }, [kpi]);

    if (!chartOptions.chart) {
        return <div className='flex h-[200px] items-center justify-center'>

            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    }


    return (<div className="p-2 md:p-4 lg:p-7 h-[200px] flex flex-col relative">

        <div className="z-5 font-semibold text-sm text-black">
            {kpi.metric?.name || "Metric Name"} |{" "}
            {kpi.segmentValue?.name || "Segment Value"}
        </div>
        <div className='flex h-full'>

            <div className='flex  h-full flex-col justify-end'>

                <div className="mt-6 font-medium text-lg sm:text-3xl md:text-3xl  ">{getNumberData(chartData?.at(-1)?.at(1))}</div>
                <div className="flex text-xs sm:text-md  text-gray-800">
                    {compareValues(chartData) === 1 ? (<span className='text-[#119F97]'>
                        {'\u2191'}

                    </span>) : (<span className='text-red-700'>

                        {`\u2193`}
                    </span>)}


                    {getPercentage(chartData)}
                    <div className="ml-2 text-[#808080]">{`Δ${chartData?.length}d`}</div>
                </div>
            </div>
            <div className="z-0 absolute w-[60%] h-full right-0 bottom-0">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                    constructorType={"chart"}
                    containerProps={{ className: "h-full w-full" }}
                />
            </div>
        </div>

    </div>
    )
}
