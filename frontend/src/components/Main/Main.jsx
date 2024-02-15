import "./Main.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { isLogin } from '../../services/isLogin';

export function Main() {

    return (
        <header className="header">
        {isLogin()&&<><div className="main">
        <div className="action-buttons"> 
            <Link to="/profile">
                <button>Мой профиль</button>
            </Link>
            </div>    
            <div className="action-buttons"> 
            <Link to="/watchlater">
                <button>Смотреть позже</button>
            </Link>
            </div> 
            <div className="action-buttons"> 
            <Link to="/searchfilm">
                <button>Поиск фильма</button>
            </Link>
            </div> 
            <div className="action-buttons"> 
            <Link to="/choose">
                <button>Выбрать фильм</button>
            </Link>            
            </div>                         
          <div className="action-buttons"> 
          <Link to="/friends">
                <button>Мои друзья</button>
            </Link>     
          </div>
          </div></>}
    </header>
      );
  };