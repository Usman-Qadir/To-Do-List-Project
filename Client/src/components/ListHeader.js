
import Model from "./Model";


const ListHeader = ({listName}) => {

  const signOut = () => {
    console.log ('sign out');
    
    }

    return (
      <div>
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="create" > ADD NEW </button> 
          
          <button className="signout" onClick = {signOut} > SIGN OUT </button>
        </div>
        <Model/>
      </div>
    );
    
  }
  
  export default ListHeader;
  