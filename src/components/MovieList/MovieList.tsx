import {Movie, MovieType} from "../Movie/Movie";
import styles from './MovieList.module.css';
import {Modal} from "../Modal/Modal";
import {useState} from "react";
import {MovieExtended} from "../Movie/MovieExtended";
import {createPortal} from "react-dom";

export type MovieListPropsType = {
    movies: MovieType[]
    showModal: boolean
    setShowModal: (value: boolean) => void
}

export const MovieList = ({movies, showModal, setShowModal}: MovieListPropsType) => {
    const [activeMovie, setActiveMovie] = useState<MovieType>();

    return (
        <div className={styles.movieList}>
            {
               movies.map(movie => <Movie setShowModal={setShowModal} key={movie.id} movie={movie} setActiveMovie={setActiveMovie}/>)
            }

            {
                activeMovie && createPortal(
                    <Modal showModal={showModal} setShowModal={setShowModal}>
                        <MovieExtended movie={activeMovie}/>
                    </Modal>,
                document.body
                )
            }
        </div>
    );
};