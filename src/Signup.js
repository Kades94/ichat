import React, {useState } from 'react'
import {db,auth} from './firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Link, useNavigate } from "react-router-dom";
import './Signup.css'
import { FaUserPlus } from "react-icons/fa";

function Signup() {
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [username, setUsername] = useState("");

    const usersDB = db.collection('users');
    const [users] = useCollectionData(usersDB)
    const nav = useNavigate();

    const signup = (e) =>{
      e.preventDefault();
      //check if username is taken
      const checkUsername = users.find((user)=>user.username === username);
      if(checkUsername) return alert("username already exists");
      if(passwordConfirm!==password) return alert("passwords not equal");
      const chatId = (Math.random() + 1).toString(36).substring(2);
        auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        nav("/chat");
        authUser.user.updateProfile({
          displayName: username
        });
        usersDB.doc(username).set({
         username: username,
         chatId:chatId
        })
      })
      .catch((error) => alert(error.message))
  }

  	return (
            <div className="form-container">
              <div className="signup">
                <h1><FaUserPlus/> Sign up</h1>
                <form>
                    <label>Email</label>
                    <input id="email" type="email" placeholder="email@address.com" onChange={(e) => setEmail(e.target.value)} required />
                    <label>Username</label>
                    <input id="username" type="text" maxLength="15" placeholder="username"  onChange={(e) => setUsername(e.target.value)} required />
                    <label>Password</label>
                    <input id="password" type="password" placeholder="password"  onChange={(e) => setPassword(e.target.value)} required />
                    <label>Confirm Password</label>
                    <input id="password-confirmation" type="password" placeholder="confirm password"  onChange={(e) => setPasswordConfirm(e.target.value)} required />
                </form>
                <button type="submit" onClick ={signup}>Sign up</button>
                <div className="login-signup"><p>Already have an account? <Link to="/login"> Log in</Link></p></div>
              </div>
            </div>
    )
}

export default Signup