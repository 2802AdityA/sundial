import { useContext, useEffect } from "react";
import axios from "axios";
import { KpiContext, MetricsContext, SegmentsContext } from "./context";

import React, { useState } from 'react';
import { ViewMode } from "./components/ViewMode";
import { EditMode } from "./components/EditMode";



export default function App() {
  const metricsContext = useContext(MetricsContext);
  const segmentsContext = useContext(SegmentsContext);
  const kpiContext = useContext(KpiContext)
  const [loading, setLoading] = useState(true);

  const getMetrics = async () => {
    const response = await axios.get("https://sundial-fe-interview.vercel.app/api/metrics");
    const data = response.data;
    metricsContext?.setMetrics(data);
    return data;
  };

  const getSegments = async () => {
    const response = await axios.get("https://sundial-fe-interview.vercel.app/api/segments");
    const data = response.data;
    segmentsContext?.setSegments(data);
    return data;
  };

  useEffect(() => {
    const fetchData = async () => {
      const metricsData = await getMetrics();
      const segmentsData = await getSegments();

      kpiContext?.setKpi([
        {
          id: Date.now(),
          metric: metricsData.data[0].id,
          segmentKey: segmentsData.data[0].segmentKey,
          segmentValue: segmentsData.data[0].values[0].segmentId,
          mode: 'edit'
        },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid />
    // <div className="border-b">

    // <div className="grid grid-cols-3 gap-4">

    //   {/* <div className=" m-4"> */}

    //   {/* <div className=""> */}

    //   <div className="ml-20 group flex items-center justify-center h-full w-[1px] bg-black ">

    //     <button className="relative w-5 h-5 bg-green-400 rounded-full font-bold text-white">
    //       +
    //     </button>
    //   </div>
    //   <GridElement />
    //   {/* <div className="group h-full w-[1px] bg-black">

    //     <button className="relative top-1/2 right-2 w-5 h-5 bg-green-400 rounded-full font-bold text-white">+</button>
    //   </div> */}
    //   <div className="w-10 flex justify-center items-center">
    //     <div className="h-full w-[1px] bg-black">

    //     </div>
    //     <div
    //       className="absolute top-1/2 transform -translate-y-1/2 right-[-10px] bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
    //     // onClick={ }
    //     >
    //       +
    //     </div>
    //     {/* <button className="relative right-2.5 w-5 h-5 bg-green-400 rounded-full font-bold text-white">+</button> */}

    //   </div>
    // </div>
    // // </div>

    // // </div>


  );

};

const Grid = () => {

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


  // Function to add a new KPI

  const addKPI = (index: number, direction: string) => {
    const newKPI = { id: Date.now(), mode: 'edit' };
    const newKPIs = [...kpiContext.kpi];
    const insertionIndex = direction === 'left' ? index : index + 1;
    newKPIs.splice(insertionIndex, 0, newKPI);
    kpiContext.setKpi(newKPIs);
    console.log(kpiContext);

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
                  <EditMode id={kpi.id} cancelButton={removeKpi} />
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
