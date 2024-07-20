import { useContext, useState } from "react"
import { KpiContext, MetricsContext, SegmentsContext } from "../context"
import { Kpi } from "../interface";

export const EditMode = ({ kpi, cancelButton }: { kpi: Kpi, cancelButton: (id: number) => void }) => {
    const metricsContext = useContext(MetricsContext);
    const segmentsContext = useContext(SegmentsContext);
    const kpiContext = useContext(KpiContext)

    const [metric, setMetric] = useState(kpi.metric ?? "");
    const [segmentKey, setSegmentKey] = useState(kpi.segmentKey ?? "");
    const [segment, setSegment] = useState(kpi.segmentValue ?? "");

    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target);

        setMetric(event.target.value);
        console.log(event.target.value);

    };


    const handleSegmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSegment(event.target.value);
        const selectedSegmentKey = event.target.options[event.target.selectedIndex].getAttribute('data-segment-key');
        setSegmentKey(selectedSegmentKey ?? "");
    };
    console.log(metric, segment);

    return <div>
        <div className="flex flex-col">

            <select id="metric" name="metric" onChange={handleMetricChange} defaultValue={metricsContext?.metrics.data[0]?.id} value={metric}>
                {metricsContext?.metrics.data.map((metric) => <option key={metric.id} value={metric.id}>{metric.displayName}</option>)}
            </select>
            <select name="segments" id="segments" value={segment} onChange={handleSegmentChange} defaultValue={segmentsContext?.segments.data[0]?.values[0]?.segmentId}>
                {segmentsContext?.segments.data.map((segment) => <optgroup key={segment.segmentKey} label={segment.displayName}>
                    {segment.values.map((value) => <option
                        key={value.segmentId}
                        value={value.segmentId}
                        data-segment-key={segment.segmentKey}
                    >
                        {value.displayName}
                    </option>)}

                </optgroup>)}
            </select>

        </div>
        <div className="">
            <button onClick={() => { cancelButton(kpi.id) }} className="bg-red-200 text-red-700 p-2 rounded-lg text-xl">Cancel</button>
            <button onClick={() => {
                kpiContext?.setKpi((kpiList) =>
                    kpiList.map(k =>
                        k.id === kpi.id
                            ? { ...k, metric: metric, segmentKey: segmentKey, segmentValue: segment, mode: 'view' }
                            : k
                    )
                );
            }} className="bg-green-400 text-white p-2 rounded-lg text-xl">Add</button>
        </div>
    </div >
}
