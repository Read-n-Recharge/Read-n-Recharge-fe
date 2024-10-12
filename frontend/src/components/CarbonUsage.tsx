import React, { useEffect, useState } from "react";
import { getCOsaving } from "../services/api";
import flower from "../assets/carbon.png";

const CarbonUsage = () => {
  const [totalCO2, setTotalCO2] = useState(0);
  const [flowerCount, setFlowerCount] = useState(0);

  useEffect(() => {
    const fetchCOData = async () => {
      try {
        const response = await getCOsaving();
        const studyData = response.data;
        
        // Calculate total CO2 saved by summing carbon_credit
        const totalCO2Saved = studyData.reduce((total, entry) => {
          return total + entry.carbon_credit;
        }, 0);

        setFlowerCount(Math.floor(totalCO2Saved / 10));
        setTotalCO2(totalCO2Saved);
      } catch (error) {
        console.error("Error fetching study data:", error);
      }
    };

    fetchCOData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Title at the top */}
      <h1 className="font-semibold text-3xl text-gray-800 m-6 text-center">
        Carbon Savings Summary
      </h1>
      
      {/* Carbon usage on the left, image on the right */}
      <div className="flex justify-center items-center p-5 mt-20">
        <div className="text-center mr-8">
          <h2 className="font-semibold text-2xl text-gray-700 mb-4">
            Carbon Usage
          </h2>
          <p className="text-gray-600">
            You have saved a total of <strong>{totalCO2.toFixed(4)} kg</strong> of CO2.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center mt-6">
        {Array.from({ length: flowerCount }).map((_, index) => (
          <img
            key={index}
            src={flower}
            alt="CO2 Flower"
            className="w-36 m-2"
          />
        ))}
        </div>
      </div>
    </div>
  );
};

export default CarbonUsage;
