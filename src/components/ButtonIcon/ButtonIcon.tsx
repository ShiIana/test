import styles from './ButtonIcon.module.css';
import {ReactNode} from "react";

type ButtonPropsType = {
    callback: () => void
    icon: ReactNode
    buttonStyle: string
    disabled?: boolean
    className?: string
}

export const ButtonIcon = ({
                               callback,
                               icon,
                               buttonStyle,
                               className,
                               disabled
                           }: ButtonPropsType) => {
    const onClickHandler = () => {
        callback();
    }

    const currentClass = styles.button + ' ' + className + ' ' +
        (buttonStyle === 'primary' ? styles.primary : buttonStyle === 'secondary' ? styles.secondary : '');

    return (
        <button className={currentClass} onClick={onClickHandler} disabled={disabled}>
            {icon}
        </button>
    );
};