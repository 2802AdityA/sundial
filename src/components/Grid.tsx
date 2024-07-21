import React, { useContext } from "react";
import { KpiContext } from "../context";
import { ViewMode } from "./ViewMode";
import { EditMode } from "./EditMode";
import { getLgSpanClass, getMdSpanClass, getRightButtonLgClass, getRightButtonMdClass } from "../utils/customClass";

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
        <div className="p-6 h-screen flex w-screen justify-center items-center">

            <div className="grid w-screen grid-cols-1 md:grid-cols-2 lg:grid-cols-6">
                {
                    kpiContext.kpi.map((kpi, index) => (
                        <div
                            key={kpi.id}
                            className={`relative border-b w-full ${getLgSpanClass(index, kpiContext.kpi.length)} ${getMdSpanClass(index, kpiContext.kpi.length)} gap-10`}
                        >

                            <React.Fragment key={kpi.id}>

                                <div className="absolute group  left-0 top-1/2 transform -translate-y-1/2 -translate-x-[50%] rounded-full transition-opacity duration-200 hover:opacity-100 opacity-0">

                                    <button
                                        onClick={() => addKPI(index, 'left')}
                                        className="p-2 opacity-0 group-hover:opacity-100 h-5 w-5 rounded-full bg-[#119F97] text-white flex items-center justify-center"
                                    >
                                        +
                                    </button>
                                </div>
                                {kpi.mode === 'view' ? (
                                    <div
                                        className=" border-x my-5 w-full cursor-pointer"
                                        onClick={() => toggleMode(kpi.id)}
                                    >
                                        <ViewMode kpi={kpi} />
                                    </div>
                                ) : (
                                    <div className=" border-x my-5 w-full ">
                                        <EditMode kpi={kpi} cancelButton={removeKpi} />
                                    </div>
                                )}


                                <div className={`absolute group  ${getRightButtonLgClass(index, kpiContext.kpi.length)} ${getRightButtonMdClass(index, kpiContext.kpi.length)} sm:block right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2 rounded-full transition-opacity duration-200`}>

                                    <button
                                        onClick={() => addKPI(index, 'right')}
                                        className="p-2 opacity-0 group-hover:opacity-100 h-5 w-5 rounded-full bg-[#119F97] text-white flex items-center justify-center"
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
