import "./Header.css";
import { Link } from "react-router-dom";
import { isLogin } from '../../services/isLogin';

export function Header() {

  const onLogout = () => {
    window.localStorage.removeItem("ACCESS");
    window.localStorage.removeItem("REFRESH");
    window.location.reload();
    window.location.href = "/login"; 
  };

  return (
    <header className="header">
        <div className="logo">
            Yet Another Movie Site
        </div>
        <div className="header-button">
            {isLogin() && <Link to="/login">
                <button onClick={onLogout}>выйти</button>
            </Link>}
        </div>    
    </header>
  );
}

