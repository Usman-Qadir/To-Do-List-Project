import Model from "./Model";
import { useState } from "react";
import { useCookies } from "react-cookie";



const ListHeader = ({ listName, getData }) => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const [showModel, setShowModel] = useState(false);
 
  //* Implemented actual sign-out logic here

  const signOut = () => {
    console.log("Signing out...");
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
    
  };

  return (
    <div>
      <h1>{listName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setShowModel(true)}>
          Add New
        </button>

        <button className="signout" onClick={signOut}>
          Sign Out
        </button>
      </div>
     { showModel && <Model mode="create" setShowModel={setShowModel} getData = {getData} />}
    </div>
  );
};

export default ListHeader;