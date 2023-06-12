import styles from './Movie.module.css';
import {imagesURl} from "../../App";

export type MovieType = {
    [key: string]: any
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    genres: string
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    year: number
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

type MoviePropsType = {
    movie: MovieType
    setShowModal: (value: boolean) => void
    setActiveMovie: (value: MovieType) => void
}

export const Movie = ({movie, setShowModal, setActiveMovie}: MoviePropsType) => {
    const {
        title,
        year,
        vote_average: rating,
        poster_path: poster,
    } = movie;

    const onClickHandler = () => {
        setShowModal(true);
        setActiveMovie(movie)
    }

    return (
        <div className={styles.movieCard} onClick={onClickHandler}>
            <img className={styles.image} src={imagesURl + poster} alt=""/>
            <div className={styles.info}>
                <p className={styles.title}>{title}</p>
                <p className={styles.year}>{year}</p>
                <p className={styles.rating}>{rating}</p>
            </div>
        </div>
    );
};