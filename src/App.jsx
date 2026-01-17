import { useState } from "react";
import VerticalSlider from "./components/VerticalSlider/VerticalSlider";

function App() {
  const [sliderValue, setSliderValue] = useState(50);

  return (
    <>
      <div style={{ margin: "20px" }}>
        <VerticalSlider value={sliderValue} onChange={setSliderValue} />
        <p>Value: {sliderValue.toFixed(0)}</p>
      </div>
    </>
  );
}

export default App;
