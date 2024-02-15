import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import {FriendItem} from "../../components/FriendItem/FriendItem";
import {FilmItem} from "../../components/FilmItem/FilmItem";
import "./ChooseMovie.css";
import { isLogin } from '../../services/isLogin';
import { ApiService } from '../../services/ApiService';


export function ChooseMovie() {
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [movies, setMovies] = useState();
    const [friends, setFriends] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
      (async () => {
        if (isLogin()) {
          const user_info = await ApiService("current_user");
          setUser(user_info);
          const friend_list = await ApiService(`friendlist/?user_id=${user_info.id}`);
          setFriends(friend_list);
        }
      })();
    }, []);

  

    const onSelectFriend = async (friend) => {
        setSelectedFriend(friend);
        await ApiService(`watchlist/${friend.id}/get_common_watchlist`)
        .then(data => {
          setMovies(data);
        })
        .catch(error => console.error(error));
    };

    return (
      friends && <div className="movie-selection">
          <div className="friend-list">
          {selectedFriend == null && <div className="friend-not-selected">
          <div className="select-text">Выберите друга:</div>
             {friends.map((friend) => (
            <div className="friend-selection">
            <FriendItem key={friend.id} friend_info={friend} is_request={false} is_search={false} />  
            <button onClick={() => onSelectFriend(friend)}>
            выбрать
            </button>
            </div>
            ))}
              </div>}
            {selectedFriend && <div className="friend-selected">
            <div className="select-text">Выбрали друга:</div>
            <FriendItem friend_info={selectedFriend} is_request={false} is_search={false} />  
            </div>}
          </div>
          {selectedFriend && movies && <div className="movie-list">
          <div className="select-text">Фильмы для вас:</div>
            {movies.map((film) => 
            <div className="movie-item">
            <div className="movie-item-info">
            <FilmItem key={film.id} film_info={film} is_watchlater={false}/> 
            </div> 
            <div>
            <Link to={`/film/${film.id}`}>
                <button>подробнее</button>
            </Link>
            </div>
            </div>
            )}
          </div>}
       </div>

    )
};
