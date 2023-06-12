import styles from './Button.module.css';
import {ReactNode} from "react";

type ButtonPropsType = {
    text?: string | number
    callback: () => void
    iconLeft?: ReactNode
    iconRight?: ReactNode
    buttonStyle: string
    disabled?: boolean
    className?: string
}

export const Button = ({
                           text,
                           callback,
                           iconLeft,
                           iconRight,
                           buttonStyle,
                           className = '',
                           disabled
                       }: ButtonPropsType) => {
    const onClickHandler = () => {
        callback();
    }

    const currentClass = styles.button + ' ' + className + ' ' +
        (buttonStyle === 'primary' ? styles.primary : buttonStyle === 'secondary' ? styles.secondary : '');

    return (
        <button className={currentClass} onClick={onClickHandler} disabled={disabled}>
            <>
                {iconLeft}
                {text}
                {iconRight}
            </>
        </button>
    );
};