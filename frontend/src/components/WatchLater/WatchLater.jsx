import "./WatchLater.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {FilmItem} from "../../components/FilmItem/FilmItem";
import { isLogin } from '../../services/isLogin';
import { ApiService } from '../../services/ApiService';


export function WatchLater() {
  
    const [filmsList, setFilmList] = useState();
    
    async function updateLists() {
      if (isLogin()) {
          const user_info = await ApiService("current_user");
          const film_list = await ApiService(`watchlist/?user_id=${user_info.id}`);
          setFilmList(film_list);  
  } };
  

    useEffect(() => {
      (async () => {
        if (isLogin()) {
          const user_info = await ApiService("current_user");
          const film_list = await ApiService(`watchlist/?user_id=${user_info.id}`);
          setFilmList(film_list);  
        }
      })();
    }, []);
  
      return (
        filmsList && <div className="film-list">
            {filmsList.map((film) => 
            <FilmItem key={film.id} film_info={film.film} is_watchlater={true} updateLists={updateLists}/>  
            )}
        </div>
      );
    };