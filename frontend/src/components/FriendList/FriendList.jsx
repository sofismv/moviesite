import "./FriendList.css";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {FriendItem} from "../../components/FriendItem/FriendItem";
import { SearchBar } from "../SearchBar/SearchBar";
import { isLogin } from '../../services/isLogin';
import { ApiService } from '../../services/ApiService';

export function FriendList() {
  
    const [friendList, setFriendList] = useState();
    const [requestList, setRequestList] = useState();
    const [searchList, setSearchList] = useState();
    const [user, setUser] = useState();

    useEffect(() => {
      (async () => {
        if (isLogin()) {
          const user_info = await ApiService("current_user");
          setUser(user_info);
        }
      })();
    }, []);

    useEffect(() => {
      (async () => {
        if (isLogin() && user) {
          const friend_list = await ApiService(`friendlist/?user_id=${user.id}`);
          setFriendList(friend_list);
          const request_list = await ApiService(`request/?user_id=${user.id}`);
          setRequestList(request_list);
        }
      })();
    }, [user]);

    async function updateLists() {
      if (isLogin() && user) {
        const friend_list = await ApiService(`friendlist/?user_id=${user.id}`);
        setFriendList(friend_list);

        const request_list = await ApiService(`request/?user_id=${user.id}`);
        setRequestList(request_list);

        console.log("updateLists");
      }
  }
  
  
      return (
        <div className="friend-list">
            <div className="friend-list-requests">
            Заявки
            {requestList && requestList.map((friend) => 
            <FriendItem key={friend.id} friend_info={friend} is_request={true} is_search={false} updateLists={updateLists}/>  
            )}
            </div>
            <div className="friend-list-friends">
            Мои друзья
            {friendList && friendList.map((friend) => 
            <FriendItem key={friend.id} friend_info={friend} is_request={false} is_search={false}/>  
            )}            
            </div>
            <div className="friend-list-search">
            Поиск
            <SearchBar placeholder={"Найти друга по логину"} setResults={setSearchList}/>
            {searchList && searchList.map((searchedFriend) => {
                const isFriend = friendList?.some(friend => friend.id === searchedFriend.id);
                const isRequest = requestList?.some(request => request.id === searchedFriend.id);
                const isCurrentUser = user?.id === searchedFriend.id;
                if (!isFriend && !isRequest && !isCurrentUser){
                    return (<FriendItem key={searchedFriend.id} friend_info={searchedFriend} is_request={false} is_search={true}/>);  
                } 
                return null;
            })}
            </div>
        </div>
      );
    };