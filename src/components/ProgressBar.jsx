import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  const [remainingTime, setRemainingTime] = useState(timer);

  useEffect(() => {
    const intervalID = setInterval(() => {
      console.log("Interval");
      setRemainingTime((prev) => prev - 10);
    }, 10);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  return (
    <progress
      className="absolute bottom-6 left-6 w-1/2"
      value={remainingTime}
      max={timer}
    />
  );
}
