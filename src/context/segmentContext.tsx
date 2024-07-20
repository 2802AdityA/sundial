import React, { createContext, useState, ReactNode } from "react";
import { SegmentResponse } from "../interface";

interface SegmentsContextType {
    segments: SegmentResponse;
    setSegments: React.Dispatch<React.SetStateAction<SegmentResponse>>;
}

export const SegmentsContext = createContext<SegmentsContextType | undefined>(undefined);

export const SegmentsProvider = ({ children }: { children: ReactNode }) => {
    const [segments, setSegments] = useState<SegmentResponse>({ data: [] });

    return (
        <SegmentsContext.Provider value={{ segments, setSegments }}>
            {children}
        </SegmentsContext.Provider>
    );
};
