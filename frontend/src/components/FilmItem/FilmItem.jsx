import { useState, useEffect } from "react";
import "./FilmItem.css";
import { isLogin } from '../../services/isLogin';
import { ApiService } from "../../services/ApiService";

export const FilmItem = ({ film_info, is_watchlater, updateLists}) => {
  const [film, setFilm] = useState(film_info);

  useEffect(() => {
    if (is_watchlater) {
      (async () => {
        const film_info_detail = await ApiService(`film/?id=${film_info}`);
        setFilm(film_info_detail[0]);
      })();
    }
  },);  

  async function handleRequest(request_str) {
    if (isLogin()) {
        try {
            const {response} = await ApiService(request_str, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                }
            });
           
            if (response && !response.ok) {
                console.log('response', response)
                const message = `An error has occurred: ${response.status}`;
                throw new Error(message);
            }
           if (response) {
            const data = await response.json();
            return data;
           }

        } catch (err) {
            console.error('Fetch error: ', err);
        }
    }
    return null;
}

  const handleAccept = () => {
    handleRequest(`watchlist/${film.id}/mark_as_watched/`)
        .then(data => {
          updateLists();
        })
        .catch(error => console.error(error));
  };

  const handleDelete = () => {
    handleRequest(`watchlist/${film.id}/remove_from_watchlist/`)
    .then(data => {
      updateLists();
    })
    .catch(error => console.error(error));
  };

  return (
    film && <div className="film">
    <div className="film-info">
      <div className="film-title">
        {film.title}
      </div>
      <div className="film-etc-info">
        {film.year} г., {film.duration_min} мин
      </div>
      </div>
      {is_watchlater && <div className="film-buttons">
      <div className="film-watched">
      <button onClick={handleAccept}>
      просмотрен
    </button>
      </div>     
        
    <div className="film-delete">
      <button onClick={handleDelete}>
      удалить
        </button>
      </div>     
      </div>}
    </div>
  );
};