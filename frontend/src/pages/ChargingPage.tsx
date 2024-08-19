import React from "react";
import RelayControl from "../components/RelayControl";

const chargingPage = () => {
    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold text-center mb-8"> Battery Charging station control</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RelayControl relayID={1}/>
                <RelayControl relayID={2}/>
                <RelayControl relayID={3}/>
                <RelayControl relayID={4}/>

            </div>
        </div>
    )
}

export default chargingPage;