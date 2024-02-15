import { useState } from "react";
import "./LoginPage.css";
import { ApiService } from "../../services/ApiService";

export const Login = () => {
    
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [isAuthForm, setIsAuthForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [error, setError] = useState();

  const onAuth = async (event) => {
    event.preventDefault();

    window.localStorage.removeItem("ACCESS");
    window.localStorage.removeItem("REFRESH");

    ApiService("token/", {
        method: "post",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: login, password: password }),
    })
    .then(data => {
        console.log("hello")
        window.localStorage.setItem("ACCESS", data.access);
        window.localStorage.setItem("REFRESH", data.refresh);
        window.location.href = "/profile"; 
    })
    .catch((error) => {
        setError('неверные данные');
    })
  };

  const onRegister = async (event) => {
    const formData = new FormData();
    formData.append("username", login);
    formData.append("password", password);
    formData.append("email", email);
    formData.append("photo", photo);
    formData.append("first_name", firstName);
    formData.append("last_name", lastName);
    formData.append("bio", bio);
    formData.append("birth_dt", birthDate);

    await ApiService("user/", {
      method: "post",
      body: formData,
    }).then(async data => {
        await onAuth(event);
    })
    .catch((error) => {
        setError('неверные данные');
    })
  };

  const handleChangePhoto = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="login-form">
      <form onSubmit={(event) => event.preventDefault()}>
        <div className="form-item">
          <label>Логин</label>
          <input
            value={login}
            onChange={(event) => setLogin(event.target.value)}
          />
        </div>
        <div className="form-item">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        {!isAuthForm && (
          <div className="form-item">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        )}
        {!isAuthForm && (
          <div className="form-item">
            <label>Имя</label>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
        )}
        {!isAuthForm && (
          <div className="form-item">
            <label>Фамилия</label>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        )}
        {!isAuthForm && (
          <div className="form-item">
            <label>Дата рождения</label>
            <input
              type="date"
              value={birthDate}
              onChange={(event) => setBirthDate(event.target.value)}
            />
          </div>
        )}
        {!isAuthForm && (
          <div className="form-item">
            <label>Био</label>
            <input
              value={bio}
              onChange={(event) => setBio(event.target.value)}
            />
          </div>
        )}
        {!isAuthForm && (
          <div className="form-photo-item">
            <label>Фото</label>
            <input type="file" onChange={handleChangePhoto} />
          </div>
        )}
        {error && (
          <div className="form-error">
            Неверные данные. Попробуйте ещё раз
          </div>
        )}
        <div className="form-item">
          {isAuthForm ? (
            <div>
            <button className="sign-in-button" onClick={onAuth}>Войти</button>
            <p className="form-item-change">Нет аккаунта? <span onClick={() => setIsAuthForm(false)}>Зарегистрироваться</span></p>
            </div>  ) : (
            <div>
            <button className="sign-up-button" onClick={onRegister}>Зарегистрироваться</button>
            <p className="form-item-change">Уже есть аккаунт? <span onClick={() => setIsAuthForm(true)}>Войти</span></p>
        </div>
             )}
        </div>
      </form>
    </div>
  );
};
