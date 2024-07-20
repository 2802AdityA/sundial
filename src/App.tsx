import { useContext, useEffect } from "react";
import axios from "axios";
import { KpiContext, MetricsContext, SegmentsContext } from "./context";
import { useState } from 'react';
import { Grid } from "./components/Grid";

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
