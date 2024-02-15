import "./Profile.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { isLogin } from '../../services/isLogin';
import { ApiService } from '../../services/ApiService';


export function Profile() {  
    const [user, setUser] = useState();

    useEffect(() => {
      if (!isLogin()) return;  
      (async () => {
        const user_info = await ApiService("current_user");
        
        if(user_info){
          setUser(user_info);
          const user_details = await ApiService(`user/${user_info.id}`);
          setUser(user_details);
        }
      })();
    }, []);
  
      
      return (
        user && <div className="profile"> 
  
            <div className="profile-photo">    
            <img src={`${user.photo}`} alt="" />
            </div>
  
            <div className="profile-info">  
  
              <div className="profile-info-header">    
                <div className="profile-info-header-name"> 
                  {user.first_name} {user.last_name}   
                </div>
                <div className="profile-info-header-edit">    
                  <Link to="/edit">
                      <button>изменить профиль</button>
                  </Link>
                </div>
              </div>
  
              <div className="profile-information"> 
                  Логин
                  <div className="profile-info-element">    
                  {user.username}
                  </div>  
                  Дата рождения
                  <div className="profile-info-element">    
                  {user.birth_dt}
                  </div>  
                  Био
                  <div className="profile-info-element">    
                  {user.bio}
                  </div>  
              </div>
  
            </div>
  
          </div>
      );
    };