import { memo, useState, useCallback } from "react";

const IncrementButton = memo(function IncrementButton({ onIncrement }) {
  console.log("IncrementButton rendered");

  return <button onClick={onIncrement}>Increment</button>;
});

function CallbackDemo() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState("light");

  const increment = useCallback(() => {
    setCount((currentCount) => currentCount + 1);
  }, []);

  function toggleTheme() {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  }

  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#ffffff" : "#333333",
        color: theme === "light" ? "#222222" : "#ffffff",
        padding: "20px",
      }}
    >
      <h2>React Performance Demo</h2>

      <p>Count: {count}</p>
      <p>Theme: {theme}</p>

      <IncrementButton onIncrement={increment} />

      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default CallbackDemo;
