import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Button from './components/button/Button'

interface Button {
  value: number;
  disableTime?: number;
}

const buttons: Button[] = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
];

function App() {
  const [count, setCount] = useState(0);
  const timerId = useRef<number | null>(null);
  const intervalId = useRef<number | null>(null);

  const timeToDecrease = 10000;

  const addValue = (value: number) => {
    setCount(prevCount => prevCount + value);
    startTimer();
  }

  const startTimer = () => {
    clearTimers();

    timerId.current = setTimeout(() => {
      startDecreasingCount();
    }, timeToDecrease);
  };

  const startDecreasingCount = () => {
    intervalId.current = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount > 1) {
          return prevCount - 1;
        }
        clearTimers()
        return 0;
      });
    }, 1000); // 1sec
  };

  const clearTimers = useCallback(() => {
    if (timerId.current) {
      clearTimeout(timerId.current);
      timerId.current = null;
    }
    if (intervalId.current) {
      clearInterval(intervalId.current);
      intervalId.current = null;
    }
  }, [timerId, intervalId]);

  useEffect(() => {
    return () => clearTimers();
  }, [clearTimers]);

  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>React Counter App</h1>
      <div className="card">
        <div className="buttons-container">
        {buttons.map((btn, idx) => (
            <div className="button-wrapper" key={idx}>
              <Button value={btn.value} clickHandler={addValue} disableTime={btn.disableTime} />
            </div>
        ))}
        </div>
        <p className="total">
          Total Value: {count}
        </p>
      </div>
    </>
  )
}

export default App
