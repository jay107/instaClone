import React, {useState} from 'react'
import {Link, useHistory} from "react-router-dom";
import M from "materialize-css";

const Signup = () => {

const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const history = useHistory();
var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const postData = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email", classes: "#d84315 deep-orange darken-3"})
        }
        // else if(!strongRegex.test(password)){
        //     M.toast({html: "try stronger password", classes: "#d84315 deep-orange darken-3"})
        // }
        else{
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json()).then(data => {
            if(data.error){
                M.toast({html: data.error, classes: "#d84315 deep-orange darken-3"})
            }else{
                M.toast({html: data.message, classes: "#43a047 green darken-1"});
                history.push("/signin");
            }
        }).catch(err => {
            console.error()
        })
    }
    }

    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)} 
                placeholder="name" />

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
                type="submit"  name="action">Sign up</button>
        <h5>
            <Link to="/signin">Already have an Account?</Link>
        </h5>
      </div>
        </div>
    )
}

export default Signup
