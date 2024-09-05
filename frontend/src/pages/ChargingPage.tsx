import React from "react";
import RelayControl from "../components/RelayControl";
import { Navbar } from "../components/common/navbar";

const chargingPage = () => {
  return (
    <div className="h-screen w-screen bg-custom-gradient">
      <Navbar />
      <h1 className="text-3xl font-bold text-center text-white p-12">
        {" "}
        Battery Charging station control
      </h1>
      <div className="flex justify-center">
        <RelayControl />
      </div>
    </div>
  );
};

export default chargingPage;
