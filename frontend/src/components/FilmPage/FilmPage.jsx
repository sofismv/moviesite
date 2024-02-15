import "./FilmPage.css";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { ApiService } from "../../services/ApiService";


export function FilmPage({}) {
    const [film, setFilm] = useState();
    const [showButton, setShowButton] = useState(true);
    let {id} = useParams();

    useEffect(() => {
      (async () => {
        const film_info = await ApiService(`film/?id=${id}`);
        setFilm(film_info[0]);
        const response = await ApiService(`watchlist/${film_info[0].id}/check_watchlater/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          }
      });
        setShowButton(!response.exists);
      })();
    }, [id]);  

    const handleAdd = async () => {
      const values = {
        film: film.id,
        is_watched: false,
      }
      await ApiService("watchlist/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setShowButton(false);
    };
  
      return (
        film && <div className="film"> 
  
            <div className="film-photo">    
            <img src={film.poster} alt="" />
            {showButton && <button onClick={handleAdd}>
            Буду смотреть 
            </button>}
            </div>
  
            <div className="film-info">  
  
              <div className="film-info-header">    
                <div className="profile-info-header-name"> 
                  {film.title} ({film.year})   
                </div>
                <div className="profile-info-description"> 
                  {film.description}
                </div>
              </div>
  
              <div className="film-information"> 
                <div className="film-row-element">    
                  Страна
                  <div className="film-info-element">    
                  {film.country}
                  </div>
                  </div>
                  <div className="film-row-element">        
                  Жанр
                  <div className="film-info-element">    
                  {film.genre}
                  </div>  
                  </div>
                  <div className="film-row-element">        
                  Время
                  <div className="film-info-element">    
                  {film.duration_min} мин
                  </div>  
                  </div> 
              </div>
  
            </div>
  
          </div>
      );
    };