import { createContext, useState, ReactNode } from "react";
import { Kpi } from "../interface";


interface KpiContextType {
    kpi: Kpi[];
    setKpi: React.Dispatch<React.SetStateAction<Kpi[]>>;
}
const defaultValue: KpiContextType = {
    kpi: [],
    setKpi: () => { }
};
export const KpiContext = createContext<KpiContextType>(defaultValue);

export const KpiProvider = ({ children }: { children: ReactNode }) => {
    const [kpi, setKpi] = useState<Array<Kpi>>([]);

    return (
        <KpiContext.Provider value={{ kpi, setKpi }}>
            {children}
        </KpiContext.Provider>
    );
};