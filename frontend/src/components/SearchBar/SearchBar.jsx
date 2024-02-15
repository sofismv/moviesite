import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { ApiService } from '../../services/ApiService';


import "./SearchBar.css";

export const SearchBar = ({placeholder, setResults}) => {
  const [input, setInput] = useState('');

  const handleChange = (value) => {
    setInput(value);
  };

  const handleSearch = (value) => {
    if (placeholder === 'Найти фильм') {
      (async () => {
        const films_list = await ApiService(`searchfilm/?q=${input}`);
        setResults(films_list);
      })();
    }
    if (placeholder === 'Найти друга по логину') {
      (async () => {
        const friend_list = await ApiService(`searchfriend/?q=${input}`);
        setResults(friend_list);
      })();
    }
    };

  return (
    <div className="input-wrapper">
        <div className="search-bar">
      <FaSearch id="search-icon"/>
      <input
        placeholder={placeholder}
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
        </div>  
      <div className="search-button">
      <button onClick={handleSearch}>
            найти
        </button>
      </div>  
    </div>
  );
};