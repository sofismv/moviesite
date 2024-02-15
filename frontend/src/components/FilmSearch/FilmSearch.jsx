import "./FilmSearch.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {FilmItem} from "../../components/FilmItem/FilmItem";
import { SearchBar } from "../SearchBar/SearchBar";
import { ApiService } from '../../services/ApiService';


export function FilmSearch() {
    const [filmsList, setFilmList] = useState();

    useEffect(() => {
      const fetchAllFilms = async () => {
        const films_list = await ApiService('film/');
        setFilmList(films_list);
      };
  
      fetchAllFilms();
    }, []);
  
  
      return (
        <div className="film-list">
            <div className="search-bar-container">
            <SearchBar placeholder={"Найти фильм"} setResults={setFilmList}/>
            </div>
            <div className="film-list">
            {filmsList && filmsList.map((film) => 
            <div className="film-search-result">
            <div className="film-item-search">
            <FilmItem key={film.id} film_info={film} is_watchlater={false}/> 
            </div>
            <Link to={`/film/${film.id}`}>
                <button>подробнее</button>
            </Link>
            </div>
            )}
            </div>
        </div>
      );
    };