import { useContext, useState } from "react"
import { KpiContext, MetricsContext, SegmentsContext } from "../context"

export const EditMode = ({ id, cancelButton }: { id: number, cancelButton: (id: number) => void }) => {
    const metricsContext = useContext(MetricsContext);
    const segmentsContext = useContext(SegmentsContext);
    const kpiContext = useContext(KpiContext)

    const [metric, setMetric] = useState("");
    const [segmentKey, setSegmentKey] = useState("");
    const [segment, setSegment] = useState("");

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

    return <div>
        <div className="flex flex-col">

            <select id="metric" name="metric" onChange={handleMetricChange}>
                {metricsContext?.metrics.data.map((metric) => <option key={metric.id} value={metric.id}>{metric.displayName}</option>)}
            </select>
            <select name="segments" id="segments" onChange={handleSegmentChange}>
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
            <button onClick={() => { cancelButton(id) }} className="bg-red-200 text-red-700 p-2 rounded-lg text-xl">Cancel</button>
            <button onClick={() => {
                kpiContext?.setKpi((kpiList) =>
                    kpiList.map(kpi =>
                        kpi.id === id
                            ? { ...kpi, metric: metric, segmentKey: segmentKey, segmentValue: segment, mode: 'view' }
                            : kpi
                    )
                );

            }} className="bg-green-400 text-white p-2 rounded-lg text-xl">Add</button>
        </div>
    </div>
}
