import React, {useState, useContext} from 'react';
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";
import {UserContext} from "../../App";

const Signin = () => {

const {state, dispatch} = useContext(UserContext);
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const history = useHistory();

    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes: "#d84315 deep-orange darken-3"})
        }
        else{
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                password,
                email
            })
            
        }).then(res => res.json()).then(data => {
            console.log(data);
            if(data.error){
                M.toast({html: data.error, classes: "#d84315 deep-orange darken-3"})
            }else{
                localStorage.setItem("jwt", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                dispatch({type: "USER", payload:data.user})
                M.toast({html: "Sign in Successfully", classes: "#43a047 green darken-1"});
                history.push("/");
            }
        }).catch(err => {
            console.log(err)
        })
    }
    }
    
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" 
                value={email}
                onChange={(e) => setEmail(e.target.value)} 
                 placeholder="email" />

                <input type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="password" />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1" 
                onClick={() => postData()}
                type="submit"  name="action">Sign In</button>
                <h5>
            <Link to="/signup">Don't have account yet?</Link>
        </h5>
        
      </div>
        </div>
    )
}

export default Signin
