import React, {createContext , useEffect, useState, useReducer, useContext} from 'react';
import "./App.css";
import Navbar from "./components/navbar";
import { Route,useHistory, Switch, BrowserRouter} from "react-router-dom"
import Home from "./components/screens/Home"
import Profile from "./components/screens/Profile"
import Login from "./components/screens/Signin"
import Signup from "./components/screens/Signup"
import CreatePost from "./components/screens/CreatePost";
import {reducer, initialState} from "./Reducer/userReducer";

//create context api
export const UserContext = createContext();

const Routing = () => {
     const history = useHistory();
     const {state, dispatch} = useContext(UserContext);
     // useEffect(() => {
     //      dispatch({type: "USER", payload:user});
     //      history.push("/");
     // }, []);
     useEffect(() => {
          const user = JSON.parse(localStorage.getItem("user"));
          if(user){
               dispatch({type: "USER", payload:user});
          }else{
               history.push("/signin");
          }
     }, [])
     return(
          <Switch>
          <Route exact path="/">
            <Home />
       </Route>
       <Route path="/profile">
            <Profile />
       </Route><Route path="/signin">
            <Login />
       </Route><Route path="/signup">
            <Signup />
       </Route>
       <Route path="/create">
               <CreatePost />
       </Route>
       </Switch>
     )
}

const App = () => {
     const [state, dispatch] = useReducer(reducer, initialState);
    return (
         <UserContext.Provider value={{state, dispatch}}>
       <BrowserRouter>
       <Navbar />
       <Routing />
       </BrowserRouter>
       </UserContext.Provider>
    )
}

export default App
