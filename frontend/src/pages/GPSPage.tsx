import React, { useEffect, useState } from "react";
import { Navbar } from "../components/common/navbar";
import { getRelayStatus } from "../services/api";
import MapComponent from "./MapComponent";
import { RelayStatus } from "../type";
export default function GpsPage() {
  const [relayStatus, setRelayStatus] = useState<RelayStatus>();
  useEffect(() => {
    const fetchRelayStatus = async () => {
      try {
        const status = await getRelayStatus();
        setRelayStatus(status);
        console.log(status);
      } catch (error) {
        console.error("Error fetching relay status:", error);
      }
    };

    fetchRelayStatus();
  }, []);

  return (
    <div className="h-screen w-screen bg-custom-gradient">
      <Navbar />
      <div className="map-box flex items-start justify-center gap-12 p-8">
        <div className="relay-status flex flex-col gap-4 mt-16">
          <h1 className="text-4xl text-white text-center mb-4 font-bold">
            Charging Status
          </h1>
          <ul className="text-white grid grid-cols-1 gap-5">
            {relayStatus &&
              Object.entries(relayStatus).map(([key, value]) => (
                <li
                  key={key}
                  className={`${
                    value.status === "active"
                      ? "bg-red-500 bg-opacity-80"
                      : "bg-white bg-opacity-20"
                  } w-full text-center p-5 rounded-lg shadow-sm`}
                >
                  <span>
                    Socket Port No. {key}: &nbsp;{value.status}
                  </span>
                </li>
              ))}
          </ul>
        </div>
        <h1></h1>

        <div className="map-api w-1/2 h-[550px] bg-white bg-opacity-70 p-4 rounded-xl shadow-md">
          <div className="map-component w-full h-full">
            <MapComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
