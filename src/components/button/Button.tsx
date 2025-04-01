import { useEffect, useState } from "react";
import './Button.css'

interface ButtonProps {
    value: number;
    clickHandler: (value: number) => void
    disableTime?: number;
  }

const Button = ({value, clickHandler, disableTime = 500 * value}: ButtonProps) => {
    const [isDisabled, setIsDisabled] = useState(false)

    const handler = () => {
        clickHandler(value);
        setIsDisabled(true);
    }

    useEffect(() => {
        if (!isDisabled) {
            return
        };

        const timer = setTimeout(() => {
            setIsDisabled(false);
        }, disableTime);

        return () => clearTimeout(timer);

    }, [isDisabled, disableTime])

    return (
        <button disabled={isDisabled} onClick={handler}>
            Add Value: {value}
        </button>
    );
}

export default Button;