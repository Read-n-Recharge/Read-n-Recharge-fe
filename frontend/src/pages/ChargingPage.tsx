import React from "react";
import RelayControl from "../components/RelayControl";

const chargingPage = () => {
    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-8"> Battery Charging station control</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RelayControl />
           

            </div>
        </div>
    )
}

export default chargingPage;