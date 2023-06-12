import styles from "./MovieExtended.module.css";
import {MovieType} from "./Movie";
import {imagesURl} from "../../App";
import {MdAccessTime, MdOutlineCalendarToday} from "react-icons/md";

type MovieExtendedPropsType = {
    movie: MovieType
}

export const MovieExtended = ({movie}: MovieExtendedPropsType) => {
    const {
        genres,
        overview,
        poster_path: poster,
        year,
        title,
        vote_average: rating
    } = movie;


    return (
        <div className={styles.movie}>
            <img className={styles.image} src={imagesURl + poster} alt=""/>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.genres}>{genres}</p>
                <div className={styles.row}>
                    <p className={styles.year}>
                        <MdOutlineCalendarToday />
                        {year}
                    </p>
                    <p className={styles.duration}>
                        <MdAccessTime />
                        1 час 15 мин
                    </p>
                </div>
                <p>{overview}</p>
                <p className={styles.rating}>{rating}</p>
            </div>
        </div>
    );
}