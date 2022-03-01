import React, {useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import {UserContext} from "../App"
const Navbar = () => {
  const {state, dispatch} = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if(state){
      return [
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/create">Create post</Link></li>,
       <li>
          <button className="btn waves-effect waves-light #c62828 red darken-3"
          onClick={() =>{ localStorage.clear()
          dispatch({type: "CLEAR"})
          history.push("/signin")
        }}
          
          >Log out</button>
         </li>
      ]
    }else{
      return [
        <li><Link to="/signin">Login</Link></li>,
        <li><Link to="/signup">Sign up</Link></li>
      ]
    }
  }
    return (
  <nav className="navbar">
    <div className="nav-wrapper white">
      <Link to={state ? "/" : "/signup"} className="brand-logo left">Instagram</Link>
      <ul id="nav-mobile" className="right">
       {renderList()}
      </ul>
    </div>
  </nav>
    )
}

export default Navbar
