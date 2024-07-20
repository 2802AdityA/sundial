import * as Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import { options } from '../config'
import { useRef } from 'react';
import { Kpi } from '../interface';

export const ViewMode = ({ kpi }: { kpi: Kpi }) => {

    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    console.log(kpi);
    // useEffect(() => {

    // })
    return (
        <div className='flex flex-col'>

            <div className='flex justify-end'>

                <div className='w-4/5 h-1/4'>
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={options}
                        ref={chartComponentRef}
                    />
                </div>
            </div>
        </div>
    )
}