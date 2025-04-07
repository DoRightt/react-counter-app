import { useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Button from './components/button/Button'

interface AppProps {
  timeToDecrease?: number;
};

interface Button {
  id: number;
  value: number;
  disableTime?: number;
}

const buttons: Button[] = [
  { id: 1, value: 1 },
  { id: 2, value: 2 },
  { id: 3, value: 3 },
];

function App({
  timeToDecrease = 10000 // 10 sec by default
}: AppProps) {
  const [count, setCount] = useState(0);
  const [countDownTimer, setCountDownTimer] = useState(timeToDecrease);

  const timerId = useRef<number | null>(null);
  const intervalId = useRef<number | null>(null);

  const tick = 1000; // 1 sec

  const clickHandler = (value: number) => {
    setCount(prevCount => prevCount + value);
    setCountDownTimer(timeToDecrease);
  }

  useEffect(() => {
    if (countDownTimer > 0) {
      timerId.current = setTimeout(() => {
        setCountDownTimer((prevState) => prevState - tick);
      }, tick);
    }

    return () => clearTimeout(timerId.current as number)
  }, [countDownTimer]);

  useEffect(() => {
    if (countDownTimer === 0) {
      intervalId.current = setInterval(() => {
        setCount((prevCount) => {
          if (prevCount > 1) {
            return prevCount - 1;
          }
          return 0;
        });
      }, tick);
    }

    return () => clearInterval(intervalId.current as number);
  }, [countDownTimer]);

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
        {buttons.map((btn) => (
            <div className="button-wrapper" key={btn.id}>
              <Button value={btn.value} clickHandler={clickHandler} disableTime={btn.disableTime} />
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
