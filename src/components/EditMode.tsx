import { useContext, useState } from "react"
import { KpiContext, MetricsContext, SegmentsContext } from "../context"
import { Kpi } from "../interface";

export const EditMode = ({ kpi, cancelButton }: { kpi: Kpi, cancelButton: (id: number) => void }) => {
    const metricsContext = useContext(MetricsContext);
    const segmentsContext = useContext(SegmentsContext);
    const kpiContext = useContext(KpiContext)

    const [metricId, setMetricId] = useState(kpi.metric?.id ?? metricsContext?.metrics.data[0].id ?? "");
    const [metricName, setMetricName] = useState(kpi.metric?.name ?? metricsContext?.metrics.data[0].displayName ?? "");
    const [segmentKeyId, setSegmentKeyId] = useState(kpi.segmentKey?.id ?? segmentsContext?.segments.data[0].segmentKey ?? "");
    const [segmentKeyName, setSegmentKeyName] = useState(kpi.segmentKey?.name ?? segmentsContext?.segments.data[0].displayName ?? "");

    const [segmentId, setSegmentId] = useState(kpi.segmentValue?.id ?? segmentsContext?.segments.data[0].values[0].segmentId ?? "");
    const [segmentName, setSegmentName] = useState(kpi.segmentValue?.name ?? segmentsContext?.segments.data[0].values[0].displayName ?? "");

    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const metricId = event.target.value;
        const metricName = event.target.options[event.target.selectedIndex].label;
        setMetricId(metricId);
        setMetricName(metricName)
    };


    const handleSegmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const segmentId = event.target.value
        const segmentName = event.target.options[event.target.selectedIndex].label

        setSegmentId(segmentId);
        setSegmentName(segmentName)

        const segmentKeyName = event.target.options[event.target.selectedIndex].closest('optgroup')?.label;


        const segmentKeyId = event.target.options[event.target.selectedIndex].getAttribute('data-segment-key');

        setSegmentKeyId(`${segmentKeyId}`);
        setSegmentKeyName(`${segmentKeyName}`);

    };

    return <div className="p-2 h-1/5">
        <div className="flex flex-col">

            <select className="rounded-lg p-2 m-2 border-0 bg-gray-100" id="metric" name="metric" onChange={handleMetricChange} defaultValue={metricsContext?.metrics.data[0]?.id} value={metricId}>
                {metricsContext?.metrics.data.map((metric) => <option label={`${metric.displayName}`} key={metric.id} value={metric.id}>{metric.displayName}</option>)}
            </select>

            <select className="rounded-lg p-2 m-2 border-0 bg-gray-100" name="segments" id="segments" value={segmentId} onChange={handleSegmentChange} defaultValue={segmentsContext?.segments.data[0]?.values[0]?.segmentId}>
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
        <div className="m-2 gap-4 flex justify-center">
            <button onClick={() => { cancelButton(kpi.id) }} className="w-full bg-[#FFECE7] text-[#FF5D39] p-2 rounded-lg text-xl">Cancel</button>
            <button onClick={() => {
                kpiContext?.setKpi((kpiList) =>
                    kpiList.map(k =>
                        k.id === kpi.id
                            ? { ...k, metric: { id: metricId, name: metricName }, segmentKey: { id: segmentKeyId, name: segmentKeyName }, segmentValue: { id: segmentId, name: segmentName }, mode: 'view' }
                            : k
                    )
                );
            }} className="bg-[#119F97] w-full text-white p-2 rounded-lg text-xl">Add</button>
        </div>
    </div >
}
