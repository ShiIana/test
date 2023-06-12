import styles from './Input.module.css'
import {ChangeEvent, ReactNode} from "react";

type InputPropsType = {
    type: string
    placeholder?: string
    icon?: ReactNode
    value: string
    callback: (value: string) => void
}

export const Input = ({value, type, icon, placeholder, callback}: InputPropsType) => {
    const onClickHandler = (evt: ChangeEvent<HTMLInputElement>) => {
        callback(evt.currentTarget.value);
    }

    return (
        <div className={styles.inputWrapper}>
            <input className={styles.input} type={type} onChange={onClickHandler} placeholder={placeholder} value={value}/>
            {icon && <div className={styles.icon}>{icon}</div>}
        </div>
    );
};