import './App.css';
import {useEffect, useState} from "react";
import {MovieList} from "./components/MovieList/MovieList";
import {Pagination} from "./components/Pagination/Pagination";
import {MovieType} from "./components/Movie/Movie";
import {Filter, FilterType} from "./components/Filter/Filter";

export type MovieTypeData = {
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    id: number
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    release_date: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
}

export type GenreTypeData = {
    id: number,
    name: string
}

export type RatingType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export const APIKey = 'b37212b62f1f1ad388cfa14922295a5d';
export const imagesURl = 'https://image.tmdb.org/t/p/original';

export const App = () => {
    // данные с сервера
    const [moviesData, setMoviesData] = useState<MovieTypeData[]>([]);
    const [genresData, setGenresData] = useState<GenreTypeData[]>([]);
    // стейты для пагинации и модалки
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [moviesPerPage] = useState<number>(8);
    const [showModal, setShowModal] = useState<boolean>(false);

    // параметры фильтра
    const [filter, setFilter] = useState<FilterType>({
        search: '',
        year: 0,
        genre_ids: 0,
        vote_average: 0
    });

    // получение данных
    const fetchMovies = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};

        fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&include_adult=false&include_video=false&language=ru-RU&page=1&sort_by=popularity.desc`, options)
            .then(response => response.json())
            .then(response => setMoviesData(response.results))
            .catch(err => console.error(err));
    }
    const fetchGenres = () => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=ru-RU`)
            .then(response => response.json())
            .then(response => setGenresData(response.genres))
            .catch(err => console.error(err));
    }

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    // в исходном массиве фильмов жанры передаются в виде айдишников, получаем их названия из массива жанров...
    const getGenreNames = (genreID: number[]) => {
        const intersection = genresData.filter(item => genreID.includes(item.id));
        return intersection.map(item => item.name).join(', ');
    }
    // ...преобразуем даты релиза (нам нужен только год)...
    const getReleaseYear = (date: string) => {
        return new Date(date).getFullYear();
    }
    // ...и создаем новый массив фильмов c преобразованными данными
    const movies = moviesData.map(movie => {
        const newMovie: MovieType = {
            ...movie,
            genres: getGenreNames(movie.genre_ids),
            year: getReleaseYear(movie.release_date)
        }
        return newMovie;
    });

    // фильтрация
    const filteredMovies = movies.filter(item => {
        return Object.keys(filter).every(key => {
            if (filter[key] !== 0 && filter[key] !== '') {
                // проверяем ключи каждого фильма на массив...
                if (Array.isArray(item[key])) {
                    // ...и ключи каждого фильтра тоже...
                    if (Array.isArray(filter[key])) {
                        // ...а потом ищем пересечения значений
                        return filter[key].every((element: any) => item[key].includes(element));
                    } else {
                        return item[key].includes(filter[key]);
                    }
                } else {
                    // и тут мы снова проверяем, есть ли массив в ключе фильтра
                    if (Array.isArray(filter[key])) {
                        return filter[key].includes(item[key]);
                    } else {
                        // фильтрация по поиску
                        if (key === 'search') {
                            const search = new RegExp(filter.search, 'i');
                            return search.test(item.title);
                        }
                        if (key === 'vote_average') return item[key] >= filter[key];
                        return item[key] === filter[key];
                    }
                }
            } else return movies;
        });
    });

    // постраничная пагинация
    const lastMovieIndex = currentPage * moviesPerPage;
    const firstMovieIndex = lastMovieIndex - moviesPerPage;
    const currentMovies = filteredMovies.slice(firstMovieIndex, lastMovieIndex);

    const showNextPage = () => setCurrentPage(current => current + 1);
    const showPrevPage = () => setCurrentPage(current => current - 1);
    const showPage = (pageNumber: number) => setCurrentPage(pageNumber);

    // если модалка активна, у контента сзади отключается прокрутка
    useEffect(() => {
        showModal ? document.body.classList.add('lock') : document.body.classList.remove('lock');
    }, [showModal]);


    return (
        <div className="App">
            <Filter
                filter={filter}
                setFilter={setFilter}
                genres={genresData}
                movies={movies}
                setCurrentPage={setCurrentPage}
            />

            {currentMovies.length === 0 ? <p>Фильмы не найдены =(</p> :
                <>
                    <MovieList movies={currentMovies} showModal={showModal} setShowModal={setShowModal}/>
                    <Pagination
                        moviesPerPage={moviesPerPage}
                        totalMovies={filteredMovies.length}
                        currentPage={currentPage}
                        showPrevPage={showPrevPage}
                        showNextPage={showNextPage}
                        showPage={showPage}
                    />
                </>

            }
        </div>
    );
}