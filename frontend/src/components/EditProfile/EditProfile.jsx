import "./EditProfile.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { isLogin } from '../../services/isLogin';
import { ApiService } from '../../services/ApiService';

export function EditProfile() {

    const [user, setUser] = useState();
    const [selectedImage, setSelectedImage] = useState();

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser((user) => ({
            ...user,
            [name]: value,
        }));
    };
    
    const handleFileChange = (e) => {
        console.log(e.target.files[0])
        setSelectedImage(URL.createObjectURL(e.target.files[0]));
        setUser((user) => ({
            ...user,
            photo: e.target.files[0],
        }));
    };
    
    const handleSave = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(user).forEach((key) => {
          let value = user[key];
          if (value) {
            if (value instanceof File) {
              formData.append(key, value, value.name);
            } else if (key !== "photo") {
              formData.append(key, value);
            }
          }
        });
      
        try {
          await ApiService(`user/${user.id}/`, {
            method: "PUT",
            body: formData,
          });
          window.location.href = "/profile";
        } catch (error) {
          console.error(error);
        }
      };
          
    const handleCancel = () => {
        window.location.href = "/profile"; 
      };
    
  
      return (
        user && <div className="edit-profile"> 
  
            <div className="edit-profile-photo">    
            <img src={selectedImage || user.photo} alt="" />
                <form>
                <label for="file-upload" class="edit-profile-photo-upload">
                Изменить фото
                </label>
                <input
                id="file-upload" 
                type="file"
                name = "photo"
                onChange={handleFileChange}
                />
                </form>
            </div>
  
            <div className="edit-profile-info">    
            <form>
                <label>
                <div className="edit-profile-label">    
                Изменить логин:
                </div>
                <input
                    type="text"
                    name="username"
                    value={user && user.username}
                    onChange={handleInputChange}
                />
                </label>
                <label>
                <div className="edit-profile-label">    
                Изменить имя:
                </div>
                <input
                    type="text"
                    name="first_name"
                    value={user && user.first_name}
                    onChange={handleInputChange}
                />
                </label>
                <label>
                <div className="edit-profile-label">    
                Изменить фамилию:
                </div>
                <input
                    type="text"
                    name="last_name"
                    value={user &&user.last_name}
                    onChange={handleInputChange}
                />
                </label>
                <label>
                <div className="edit-profile-label">    
                Изменить почту:
                </div>
                <input
                    type="text"
                    name="email"
                    value={user &&user.email}
                    onChange={handleInputChange}
                />
                </label>
                <label>
                <div className="edit-profile-label">    
                Изменить пароль:
                </div>
                <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                />
                </label>
                <label>
                <div className="edit-profile-label">    
                Изменить био:
                </div>
                <input
                    type="text"
                    name="bio"
                    value={user && user.bio}
                    onChange={handleInputChange}
                />
                </label>
                <label>
                <div className="edit-profile-label">    
                Изменить дату рождения:
                </div>
                <input
                    type="date"
                    name="birth_dt"
                    value={user && user.birth_dt}
                    onChange={handleInputChange}
                />
                </label>
                <div className="profile-info-buttons">    
                <button onClick={handleSave}>
                сохранить
                </button>
                <br />
                <button onClick={handleCancel}>
                отменить
                </button>
                </div>
                </form>  
            </div>
  
          </div>
      );
    };