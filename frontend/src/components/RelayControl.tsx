import React, { useState, useEffect } from 'react';
import { startRelay, Relaytatus } from '../services/api';

interface RelayControlProps {
    relayID: number;
    isActivated: boolean;
    onActivate: (relayID: number, duration: number) => void;
}

const RelayControl: React.FC<RelayControlProps> = ({ relayID, isActivated, onActivate }) => {
    const [duration, setDuration] = useState<number | string>(15);
    const [countdown, setCountdown] = useState<number | null>(null);

    const handleActivate = () => {
        const numericDuration = Number(duration);
        if (numericDuration >= 15) {
            onActivate(relayID, numericDuration);
            setCountdown(numericDuration * 60);
        }
    };

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isActivated && countdown !== null) {
            timer = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown && prevCountdown > 1) {
                        return prevCountdown - 1;
                    } else {
                        clearInterval(timer);
                        return 0;
                    }
                });
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isActivated, countdown]);

    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDuration(value === '' ? '' : Math.max(Number(value), 0));
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-lg font-semibold text-black">Relay {relayID}</h3>
            <input
                type="number"
                placeholder="Set duration (minutes)"
                value={duration}
                onChange={handleDurationChange}
                disabled={isActivated}
                className="border rounded p-2"
            />
            <button 
                onClick={handleActivate} 
                disabled={isActivated || Number(duration) < 15}
                className={`mt-4 w-full py-2 px-4 rounded text-white ${isActivated || Number(duration) < 15 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
            >
                Activate Charging
            </button>
            {isActivated && countdown !== null && (
                <div className='mt-4 text-black rounded-xl'> 
                    <h4>
                        Time remaining: {Math.floor(countdown / 60)} minutes {countdown % 60} seconds
                    </h4>
                </div>
            )}
        </div>
    );
};

const RelayDashboard: React.FC = () => {
    const [relayStatus, setRelayStatus] = useState<{ [key: number]: string }>({});

    useEffect(() => {
        const fetchRelayStatus = async () => {
            try {
                const status = await Relaytatus();
                setRelayStatus(status);
            } catch (error) {
                console.error('Error fetching relay status:', error);
            }
        };

        fetchRelayStatus();
    }, []);

    const handleActivate = async (relayID: number, duration: number) => {
        try {
            await startRelay(relayID, duration);
            setRelayStatus(prevStatus => ({
                ...prevStatus,
                [relayID]: 'active'
            }));
        } catch (error) {
            console.error('Error activating relay:', error);
        }
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            {Object.keys(relayStatus).map(relayID => (
                <RelayControl
                    key={relayID}
                    relayID={Number(relayID)}
                    isActivated={relayStatus[Number(relayID)] === 'active'}
                    onActivate={handleActivate}
                />
            ))}
        </div>
    );
}    

export default RelayDashboard;
