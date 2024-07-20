import React, { useContext } from "react";
import { KpiContext } from "../context";
import { ViewMode } from "./ViewMode";
import { EditMode } from "./EditMode";

export const Grid = () => {
    const kpiContext = useContext(KpiContext)

    const toggleMode = (id: number) => {

        kpiContext?.setKpi((kpiList) =>
            kpiList.map(kpi =>
                kpi.id === id
                    ? { ...kpi, mode: 'edit' }
                    : kpi
            )
        );
    };

    const addKPI = (index: number, direction: string) => {
        const newKPI = { id: Date.now(), mode: 'edit' };
        const newKPIs = [...kpiContext.kpi];
        const insertionIndex = direction === 'left' ? index : index + 1;
        newKPIs.splice(insertionIndex, 0, newKPI);
        kpiContext.setKpi(newKPIs);
    };

    const removeKpi = (id: number) => {
        const kpiList = kpiContext.kpi.filter(kpi => kpi.id !== id)
        kpiContext.setKpi(kpiList)
    };

    return (
        <div className="grid grid-cols-3 gap-2">
            {
                kpiContext.kpi.map((kpi, index) => (
                    <React.Fragment key={kpi.id}>
                        <div>
                            <button
                                onClick={() => addKPI(index, 'left')}
                                className="p-2 bg-blue-500 text-white rounded"
                            >
                                Add Left
                            </button>
                            {kpi.mode === 'view' ? (
                                <div
                                    className="p-4 bg-gray-200 border cursor-pointer"
                                    onClick={() => toggleMode(kpi.id)}
                                >
                                    <ViewMode kpi={kpi} />
                                </div>
                            ) : (
                                <div className="p-4 bg-gray-200 border">
                                    <EditMode kpi={kpi} cancelButton={removeKpi} />
                                </div>
                            )}
                            <button
                                onClick={() => addKPI(index, 'right')}
                                className="p-2 bg-blue-500 text-white rounded"
                            >
                                Add Right
                            </button>
                        </div>
                    </React.Fragment>
                ))}
        </div>
    );
};
