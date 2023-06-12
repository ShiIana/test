import styles from './Modal.module.css';
import {MdClose} from "react-icons/md";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";
import { PropsWithChildren } from 'react'

type ModalPropsType = {
    title?: string
    showModal: boolean
    setShowModal: (value: boolean) => void
}

export const Modal = ({title, showModal, setShowModal, children}: PropsWithChildren<ModalPropsType>) => {
    if (!showModal) return null;
    const onCancelHandler = () => setShowModal(false);

    return (
        <div className={styles.modal} onClick={onCancelHandler}>
            <section className={styles.modalContent} onClick={evt => evt.stopPropagation()}>
                <div className={styles.modalHeader}>
                    {title && <h2>{title}</h2>}

                    <ButtonIcon
                        icon={<MdClose/>}
                        callback={onCancelHandler}
                        buttonStyle='secondary'
                        className={styles.modalClose}
                    />
                </div>
                <div className={styles.modalBody}>{children}</div>
            </section>
        </div>
    );
};