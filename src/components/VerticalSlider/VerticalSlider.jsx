import { useState, useRef, useEffect } from "react";
import "./VerticalSlider.css";

function VerticalSlider({
  min = 0,
  max = 100,
  value = 50,
  onChange,
  step = 1,
}) {
  const [currentValue, setCurrentValue] = useState(value);
  const sliderRef = useRef(null);
  const isDragging = useRef(false);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const updateValue = (newValue) => {
    const clampedValue = Math.min(max, Math.max(min, newValue));
    setCurrentValue(clampedValue);
    onChange && onChange(clampedValue);
  };

  const setValueFromPosition = (clientY) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const height = rect.height;
    const percentage = 1 - y / height;
    const newValue = min + percentage * (max - min);
    updateValue(newValue);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setValueFromPosition(e.clientY);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const handleTouchStart = () => {
    isDragging.current = true;
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    setValueFromPosition(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", handleTouchEnd);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      updateValue(currentValue + step);
    } else if (e.key === "ArrowDown") {
      updateValue(currentValue - step);
    }
  };

  const percentage = ((currentValue - min) / (max - min)) * 100;

  return (
    <div
      className="vertical-slider"
      ref={sliderRef}
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={currentValue}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div
        className="track"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="fill"
          style={{ transform: `translateY(-${percentage}%)` }}
        ></div>
        <div
          className="thumb"
          style={{ bottom: `${percentage}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="thumb-inner"></div>
        </div>
      </div>
    </div>
  );
}

export default VerticalSlider;
