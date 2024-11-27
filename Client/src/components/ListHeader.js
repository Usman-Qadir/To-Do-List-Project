import Model from "./Model";
import { useState } from "react";

const ListHeader = ({ listName, getData }) => {
  const [showModel, setShowModel] = useState(false);
 
  const signOut = () => {
    console.log("Signing out...");
    // Implement your actual sign-out logic here
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