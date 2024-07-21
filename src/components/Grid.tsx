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

    const getGridClasses = (index: number, length: number) => {
        if (length % 3 === 1 && index === length - 1) {
            return 'lg:col-span-6';
        }
        if (length % 3 === 2 && index >= length - 2) {
            return 'lg:col-span-3';
        }
        return 'lg:col-span-2';
    };




    return (
        <div className="p-6 flex w-full justify-center items-center">

            <div className="grid w-full max-w-screen-lg gap-y-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-6">
                {
                    kpiContext.kpi.map((kpi, index) => (
                        <div
                            key={kpi.id}
                            className={`relative border-x  w-full ${getGridClasses(index, kpiContext.kpi.length)} gap-10`}
                        >

                            <React.Fragment key={kpi.id}>
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 rounded-full shadow-lg  transition-opacity duration-200">

                                    <button
                                        onClick={() => addKPI(index, 'left')}
                                        className="p-2 h-5 w-5 rounded-full bg-[#119F97] text-white flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                {kpi.mode === 'view' ? (
                                    <div
                                        className="p-4 bg-gray-400 w-full cursor-pointer"
                                        onClick={() => toggleMode(kpi.id)}
                                    >
                                        <div>
                                            ehd
                                        </div>
                                        <ViewMode kpi={kpi} />
                                    </div>
                                ) : (
                                    <div className="p-4 w-full">
                                        <EditMode kpi={kpi} cancelButton={removeKpi} />
                                    </div>
                                )}

                                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rounded-full shadow-lg  transition-opacity duration-200">

                                    <button
                                        onClick={() => addKPI(index, 'right')}
                                        className="p-2 h-5 w-5 rounded-full bg-[#119F97] text-white flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>

                            </React.Fragment>
                        </div>
                    ))}

            </div>
        </div>
    );
};
