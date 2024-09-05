import React, { useEffect, useState } from "react";
import { Navbar } from "../components/common/navbar";
import { getRelayStatus } from "../services/api";

export default function GpsPage() {

  const [relayStatus, setRelayStatus] = useState<{ [key: number]: string }>({});
  useEffect(() => {
    const fetchRelayStatus = async () => {
        try {
            const status = await getRelayStatus();
            setRelayStatus(status);
        } catch (error) {
            console.error('Error fetching relay status:', error);
        }
    };

    fetchRelayStatus();
}, []);

  return (
    <div className="h-screen w-screen bg-custom-gradient">
      <Navbar />
      <div className="map-box flex items-center justify-center gap-12">
        <div className="realy-status w-96 bg-white bg-opacity-45">
          <h1 className="text-4xl text-white text-center items-center ">
            Charging Status
          </h1>
        </div>
        <div className="map-api w-96 bg-white bg-opacity-45">
          Google map
        </div>
      </div>
    </div>
  );
}
