import React, { useState, useEffect } from "react";
import {
  startRelay,
  getRelayStatus,
  points_record,
  getTotalPoints,
} from "../services/api";
import { Point } from "../type";
import Modal from "../components/common/modalCharging";

const RelayControl: React.FC = () => {
  const [relayStatus, setRelayStatus] = useState<{
    [key: number]: { status: string; duration: number };
  }>({});
  const [durations, setDurations] = useState<{
    [key: number]: number | string;
  }>({});
  const [countdowns, setCountdowns] = useState<{
    [key: number]: number | null;
  }>({});
  const [totalPoints, setTotalPoints] = useState<Point | null>(null);
  const [calculatedPoints, setCalculatedPoints] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [activeRelayID, setActiveRelayID] = useState<number | null>(null);

  useEffect(() => {
    const fetchRelayStatus = async () => {
      try {
        const status = await getRelayStatus();
        setRelayStatus(status);
        initializeCountdowns(status);
        const points = await getTotalPoints();
        setTotalPoints(points);
      } catch (error) {
        console.error("Error fetching relay status or points:", error);
      }
    };

    fetchRelayStatus();
  }, []);

  const initializeCountdowns = (status: {
    [key: number]: { status: string; duration: number };
  }) => {
    const newCountdowns: { [key: number]: number | null } = {};
    Object.keys(status).forEach((relayID) => {
      const relay = status[relayID];
      if (relay.status === "active") {
        newCountdowns[Number(relayID)] = relay.duration;
      } else {
        newCountdowns[Number(relayID)] = null;
      }
    });
    setCountdowns(newCountdowns);
  };

  const handleActivate = async (relayID: number) => {
    const duration = Number(durations[relayID]);
    const pointsNeeded = calculatePoints(duration);

    if (
      totalPoints?.total_points !== undefined &&
      totalPoints.total_points >= pointsNeeded
    ) {
      setCalculatedPoints(pointsNeeded);
      setActiveRelayID(relayID);
      setShowModal(true);
    } else {
      alert("You don't have enough points to activate this relay.");
    }
  };

  const confirmActivation = async () => {
    const relayID = activeRelayID!;
    const duration = Number(durations[relayID]);

    try {
      // Start the relay
      await startRelay(relayID, duration);
      setRelayStatus((prevStatus) => ({
        ...prevStatus,
        [relayID]: { status: "active", duration: duration * 60 },
      }));

      setCountdowns((prevCountdowns) => ({
        ...prevCountdowns,
        [relayID]: duration * 60,
      }));

      await points_record(calculatedPoints, "use");
      // setTotalPoints(totalPoints - calculatedPoints!);

      setShowModal(false);
    } catch (error) {
      console.error("Error activating relay:", error);
    }
  };

  useEffect(() => {
    const intervalIds: { [key: number]: ReturnType<typeof setInterval> } = {};

    Object.keys(relayStatus).forEach((relayID) => {
      const numericRelayID = Number(relayID);
      if (
        relayStatus[numericRelayID]?.status === "active" &&
        countdowns[numericRelayID] !== null
      ) {
        intervalIds[numericRelayID] = setInterval(() => {
          setCountdowns((prevCountdowns) => {
            const newCountdown =
              prevCountdowns[numericRelayID] &&
              prevCountdowns[numericRelayID] > 1
                ? prevCountdowns[numericRelayID]! - 1
                : 0;

            if (newCountdown === 0) {
              checkRelayStatus(numericRelayID);
            }

            return { ...prevCountdowns, [numericRelayID]: newCountdown };
          });
        }, 1000);
      }
    });

    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [relayStatus, countdowns]);

  const checkRelayStatus = async (relayID: number) => {
    try {
      const status = await getRelayStatus();
      setRelayStatus((prevStatus) => ({
        ...prevStatus,
        [relayID]: status[relayID],
      }));
      console.log(`Relay ${relayID} status after polling:`, status[relayID]);
    } catch (error) {
      console.error("Error polling relay status:", error);
    }
  };

  const handleDurationChange = (relayID: number, value: string) => {
    setDurations((prevDurations) => ({
      ...prevDurations,
      [relayID]: value === "" ? "" : Math.max(Number(value), 0),
    }));
  };
  const calculatePoints = (duration: number) => {
    return duration * 7;
  };

  return (
    <div className="grid grid-cols-2 gap-6 px-24 py-12">
      {Object.keys(relayStatus).map((relayID) => {
        const numericRelayID = Number(relayID);
        const isActivated = relayStatus[numericRelayID]?.status === "active";
        const countdown = countdowns[numericRelayID];
        const duration = durations[numericRelayID];
        const calculatedPoints = calculatePoints(Number(duration) || 0);

        return (
          <div
            key={relayID}
            className={`bg-white shadow-md rounded-lg p-6 ${
              isActivated ? "bg-gray-200" : ""
            }`}
          >
            <h3 className="text-lg font-semibold text-black py-2">
              Relay {relayID}
            </h3>

            <input
              type="number"
              placeholder="Set duration (minutes)"
              value={durations[numericRelayID] || ""}
              onChange={(e) =>
                handleDurationChange(numericRelayID, e.target.value)
              }
              disabled={isActivated}
              className="border rounded p-2 w-full"
            />

            {isActivated && countdown !== null && (
              <p className="text-xs text-gray-700 pt-2">
                Time remaining: {Math.floor(countdown / 60)} minutes{" "}
                {countdown % 60} seconds
              </p>
            )}
            {duration && Number(duration) >= 15 && (
              <p className="mt-2 text-xs text-blue-500">
                You will need {calculatedPoints} points to redeem for {duration}{" "}
                minutes.
              </p>
            )}

            <button
              onClick={() => handleActivate(numericRelayID)}
              disabled={isActivated || Number(durations[numericRelayID]) < 15}
              className={`mt-4 w-full py-2 px-4 rounded text-white ${
                isActivated || Number(durations[numericRelayID]) < 15
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              {isActivated ? "Active" : "Activate Charging"}
            </button>
          </div>
        );
      })}

      {showModal && (
        <Modal
          title="Confirm Activation"
          content={`You will use ${calculatedPoints} points to charging battery. Do you confirm?`}
          onConfirm={confirmActivation}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default RelayControl;
