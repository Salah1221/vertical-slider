# Vertical Slider Component

This is a simple vertical slider for React apps.

## How to Use

1. Import the component:

   ```javascript
   import VerticalSlider from "./src/components/VerticalSlider/VerticalSlider";
   ```

2. Use it in your JSX:
   ```jsx
   <VerticalSlider
     min={0}
     max={100}
     value={50}
     onChange={(newValue) => console.log(newValue)}
     step={1}
   />
   ```

## Props

- `min`: Lowest value (default: 0)
- `max`: Highest value (default: 100)
- `value`: Current value (default: 50)
- `onChange`: Function called when value changes
- `step`: How much value changes per step (default: 1)
- `stopAt`: Percentage of height where slider stops (default: 100)

## How It Works

- Click and drag the thumb to change the value.
- Use arrow keys when focused.
- Works on touch devices too.

> Check the `VerticalSlider.css` so you could modify the style of the slider
