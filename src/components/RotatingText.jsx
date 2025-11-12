"use client";
import { forwardRef, useState, useEffect, useCallback } from "react";

const RotatingText = forwardRef(({ texts, rotationInterval = 2000 }, ref) => {
  const [index, setIndex] = useState(0);

  const changeText = useCallback(() => {
    setIndex((prev) => (prev + 1) % texts.length);
  }, [texts.length]);

  useEffect(() => {
    const interval = setInterval(changeText, rotationInterval);
    return () => clearInterval(interval);
  }, [changeText, rotationInterval]);

  return (
    <div className="rotating-text-container" ref={ref}>
      <span className="rotating-text">
        <span key={texts[index]} className="rotating-text-inner">
          {texts[index]}
        </span>
      </span>
    </div>
  );
});

export default RotatingText;
