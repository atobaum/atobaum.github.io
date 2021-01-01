import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

export default function ProgressBar() {
  const [ratio, setRatio] = useState(0);
  useEffect(() => {
    const updateRatio = () => {
      setRatio(
        ~~(
          (window.scrollY /
            (document.documentElement.scrollHeight - window.innerHeight)) *
          100
        )
      );
    };

    document.addEventListener("scroll", updateRatio);
    return () => document.removeEventListener("scroll", updateRatio);
  }, []);

  return (
    <div className="progress-bar-container">
      <div style={{ width: ratio + "%" }}></div>
    </div>
  );
}
