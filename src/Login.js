import React, { useState } from 'react'
import {db,auth} from './firebase';
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import { FaUnlockAlt } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const nav = useNavigate();


    const login = (e) =>{
    	e.preventDefault();
    	auth.signInWithEmailAndPassword(email,password).then(()=>{
            nav("/chat");
        })
    	.catch(error => alert(error.message));
  	}

  	return (
        <div className="form-container">
            <div className="login">
                <h1><FaUnlockAlt/> Log In</h1>
                <form>
                    <label>Email</label>
                    <input id="email" type="email" placeholder="email@address.com" onChange={(e) => setEmail(e.target.value)} required />
                    <label>Password</label>
                    <input id="password" type="password" placeholder="password"  onChange={(e) => setPassword(e.target.value)} required />
                </form>
                <button type="submit" onClick ={login}>Log In</button>
                <div className="login-signup"><p>Don't have an account? <Link to="/signup">Sign Up</Link></p></div>
            </div>
        </div>
    )
}

export default Login