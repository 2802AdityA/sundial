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
        <div className="p-6 flex justify-center items-center">

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {
                    kpiContext.kpi.map((kpi, index) => (
                        <div className="flex">

                            <React.Fragment key={kpi.id}>
                                {/* <div className="flex gap-2"> */}
                                {index === 0 && (<div className="flex justify-center items-center">

                                    <button
                                        onClick={() => addKPI(index, 'left')}
                                        className="p-2 h-5 w-5 rounded-full bg-[#119F97] text-white flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>)}
                                {kpi.mode === 'view' ? (
                                    <div
                                        className="p-4 bg-gray-400 cursor-pointer"
                                        onClick={() => toggleMode(kpi.id)}
                                    >
                                        <div>
                                            ehd
                                        </div>
                                        <ViewMode kpi={kpi} />
                                    </div>
                                ) : (
                                    <div className="p-4">
                                        <EditMode kpi={kpi} cancelButton={removeKpi} />
                                    </div>
                                )}

                                <div className="flex justify-center items-center">

                                    <button
                                        onClick={() => addKPI(index, 'right')}
                                        className="p-2 h-5 w-5 rounded-full bg-[#119F97] text-white flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>


                                {/* </div> */}
                            </React.Fragment>
                        </div>
                    ))}
            </div>
        </div>
    );
};
