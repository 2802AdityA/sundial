import React, { createContext, useState, ReactNode } from "react";
import { MetricResponse } from "../interface";

interface MetricsContextType {
    metrics: MetricResponse;
    setMetrics: React.Dispatch<React.SetStateAction<MetricResponse>>;
}

export const MetricsContext = createContext<MetricsContextType | undefined>(undefined);

export const MetricsProvider = ({ children }: { children: ReactNode }) => {
    const [metrics, setMetrics] = useState<MetricResponse>({ data: [] });

    return (
        <MetricsContext.Provider value={{ metrics, setMetrics }}>
            {children}
        </MetricsContext.Provider>
    );
};