import Model from "./Model";
import { useState } from "react";
import { useCookies } from "react-cookie";

const ListHeader = ({ listName, getData }) => {
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const [showModel, setShowModel] = useState(false);

    const signOut = () => {
        removeCookie('authToken', { path: '/' });
        removeCookie('Email', { path: '/' });
        window.location.reload(); // Reloads the page to reset the state
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
            {showModel && <Model mode="create" setShowModel={setShowModel} getData={getData} />}
        </div>
    );
};

export default ListHeader;
