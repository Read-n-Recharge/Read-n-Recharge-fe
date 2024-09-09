import React, { useEffect, useState } from "react";
import RelayControl from "../components/RelayControl";
import { Navbar } from "../components/common/navbar";
import { Point } from "../type";
import { getTotalPoints } from "../services/api";

const chargingPage = () => {
  const [totalPoint, setTotalPoint] = useState<Point | null>(null);
  useEffect(() => {
    const fetchUserPoint = async () => {
      try {
        const fetchedTotalPoint = await getTotalPoints();
        setTotalPoint({
          total_points: fetchedTotalPoint.total_points,
        });
        console.log(fetchedTotalPoint);
      } catch (error) {
        console.error("Error fetching user point:", error);
      }
    };
    fetchUserPoint();
  }, []);

  return (
    <div className="h-screen w-screen bg-custom-gradient">
      <Navbar />
      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-3xl font-bold text-center text-white p-5">
          Battery Charging station control
        </h1>
        <div className="text-md text-white border w-fit p-3 rounded-full mt-5">
          {totalPoint !== null ? (
            <p>Your remaining points : {totalPoint.total_points}</p>
          ) : (
            <p>Your remaining points : 0</p>
          )}
        </div>
      </div>

      <RelayControl />
    </div>
  );
};

export default chargingPage;
