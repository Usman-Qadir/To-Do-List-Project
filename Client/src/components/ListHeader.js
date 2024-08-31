



const ListHeader = ({listName}) => {

  const signOut = () => {
    console.log ('sign out');
    
    }

    return (
      <div>
        <h1>{listName}</h1>
        <div className="button-container">
          <button className="Create" > ADD NEW </button> 
          
          <button className="SignOut" onClick = {signOut} > SIGN OUT </button>
        </div>
      </div>
    );
    
  }
  
  export default ListHeader;
  