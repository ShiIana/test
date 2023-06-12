import styles from './Pagination.module.css'
import {Button} from "../Button/Button";
import {MdOutlineArrowBack} from "react-icons/md";
import {MdOutlineArrowForward} from "react-icons/md";

type paginationPropsType = {
    moviesPerPage: number
    totalMovies: number
    currentPage: number
    showPrevPage: () => void
    showNextPage: () => void
    showPage: (pageNumber: number) => void
}

export const Pagination = ({
                               moviesPerPage,
                               totalMovies,
                               currentPage,
                               showPrevPage,
                               showNextPage,
                               showPage
                           }: paginationPropsType) => {
    const paginationNumbers: number[] = [];
    const paginationLength: number = Math.ceil(totalMovies / moviesPerPage);

    for (let i = 1; i <= paginationLength; i++) {
        paginationNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <Button
                callback={showPrevPage}
                text='Предыдущая'
                iconLeft={<MdOutlineArrowBack/>}
                buttonStyle='primary'
                disabled={currentPage === 1}
            />

            {
                paginationNumbers.map(number => {
                    return (
                        <Button
                            key={number}
                            callback={() => showPage(number)}
                            text={number}
                            buttonStyle='secondary'
                            className={styles.hidden}
                        />)
                })
            }

            <Button
                callback={showNextPage}
                text='Следующая'
                iconRight={<MdOutlineArrowForward/>}
                buttonStyle='primary'
                disabled={currentPage === paginationLength}
            />
        </div>
    );
};