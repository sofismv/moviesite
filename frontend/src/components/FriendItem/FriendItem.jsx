import { useState, useEffect} from "react";
import "./FriendItem.css";
import { isLogin } from '../../services/isLogin';
import { ApiService } from '../../services/ApiService';

export const FriendItem = ({ friend_info, is_request, is_search, updateLists}) => {
  const [friend, setFriend] = useState(friend_info);
  const [friendRequest, setFriendRequest] = useState(true);

  useEffect(() => {
    (async () => {
      if (isLogin() && friend) {
        const response = await ApiService(`request/${friend.id}/check_request/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          }
      });
      setFriendRequest(!response.exists);
      }
    })();
  }, [friend]);  

  async function updateStatus() {
    (async () => {
      if (isLogin() && friend) {
        const response = await ApiService(`request/${friend.id}/check_request/`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          }
      });
      setFriendRequest(!response.exists);
      }
    })();
}


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
    handleRequest(`request/${friend.id}/accept_request/`)
        .then(data => {
          updateLists();
        })
        .catch(error => console.error(error));
  };

const handleAddFriend = () => {
  handleRequest(`request/${friend.id}/send_request/`)
  .then(data => {
    updateStatus();
  })
  .catch(error => console.error(error));
};

  return (
    <div className="friend">
    <div className="friend-info">
      <div className="friend-photo">
        <img src={friend.photo} alt="" />
      </div>
      <div className="friend-name">
        {friend.first_name} {friend.last_name} (@{friend.username})
      </div>
      </div>
      {is_request && <div className="friend-accept">
      <button onClick={handleAccept}>
            принять
    </button>
      </div>     
        }
    {is_search && <div className="friend-add-search"> 
      {friendRequest && <button onClick={handleAddFriend}>
            добавить
        </button>}
      {!friendRequest && <div className="friend-added">
            заявка отправлена
        </div>}       
      </div>    
    }
    </div>
  );
};