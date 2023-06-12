import styles from './Filter.module.css'
import {HiAdjustmentsHorizontal} from "react-icons/hi2";
import {MdOutlineSearch} from "react-icons/md";
import {ButtonIcon} from "../ButtonIcon/ButtonIcon";
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";
import {ChangeEvent, useEffect, useState} from "react";
import {GenreTypeData, RatingType} from "../../App";
import {MovieType} from "../Movie/Movie";

export type FilterType = {
    [key: string]: any
    search: string
    year: number
    genre_ids: number
    vote_average: number
}

type FilterPropsType = {
    filter: FilterType,
    setFilter: (filter: FilterType) => void
    genres: GenreTypeData[]
    movies: MovieType[]
    setCurrentPage: (value: number) => void
}

export const Filter = ({filter, setFilter, genres, movies, setCurrentPage}: FilterPropsType) => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [localFilter, setLocalFilter] = useState<FilterType>(filter);
    const filterRating: RatingType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const uniqueMovieYears: Set<number> = new Set(movies.map(movie => movie.year));
    const filterYears = Array.from(uniqueMovieYears);

    const onSearchHandler = (value: string) => {
        setLocalFilter({...localFilter, search: value});
    }

    const onChangeHandler = (evt: ChangeEvent<HTMLSelectElement>) => {
        const selected = Number(evt.currentTarget.value);
        setLocalFilter({...localFilter, [evt.currentTarget.id]: selected});
    }

    const onFilterHandler = () => {
        setCurrentPage(1);
        setFilter({...filter,  ...localFilter})
        showMenu();
    }

    const filterWrapperClass = isMenuOpen ? styles.filterWrapper + ' ' + styles.active : styles.filterWrapper;

    useEffect(() => {
        window.addEventListener('resize', () => {
            const media = window.matchMedia('(min-width: 992px)').matches;
            if (media) return;
            isMenuOpen ? document.body.classList.add('lock') : document.body.classList.remove('lock');
        });
    }, [isMenuOpen]);

    const showMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className={styles.filterHeader}>
            <div className={filterWrapperClass}>
                <Input
                    value={localFilter.search}
                    type='text'
                    callback={onSearchHandler}
                    icon={<MdOutlineSearch/>}
                    placeholder='Поиск по названию'
                />

                <select className={styles.select} name="" id="genre_ids" onChange={onChangeHandler} value={localFilter.genre_ids}>
                    <option value={0}>Все жанры</option>
                    {
                        genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)
                    }
                </select>

                <select className={styles.select} name="" id="vote_average" onChange={onChangeHandler} value={localFilter.vote_average}>
                    <option value={0}>Любой рейтинг</option>
                    {
                        filterRating.map((rate, index) => <option key={index} value={rate}>выше {rate}</option>)
                    }
                </select>

                <select className={styles.select} name="" id="year" onChange={onChangeHandler} value={localFilter.year}>
                    <option value={0}>Все года</option>
                    {
                        filterYears.map((year, index) => <option key={index} value={year}>{year}</option>)
                    }
                </select>

                <Button buttonStyle='primary' callback={onFilterHandler} text='Найти'/>
            </div>

            <ButtonIcon
                className={styles.filterButton}
                icon={<HiAdjustmentsHorizontal/>}
                buttonStyle='primary'
                callback={showMenu}
            />
        </div>
    );
};