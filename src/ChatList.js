import React, { useState } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Chat from './Chat'
import { db,auth } from './firebase'
import Friend from './Friend'
import './ChatList.css'
import { FaSignOutAlt } from "react-icons/fa";
import Avatar from 'react-avatar';
import { Link, useNavigate } from "react-router-dom";

function ChatList(props) {

    const currentUser = props.user.displayName;
    const usersDB = db.collection('users');
    const [users] = useCollectionData(usersDB)
    const [searchChat, setSearchChat] = useState('')
    const nav = useNavigate();

  	const signOut =()=>{
    	auth.signOut();
        nav("/");
  	}

    const chat = props.chat

    return (
        <div className="chats">
            <div className="header">
                <p><Avatar name={currentUser}round="50%" size="50" /> {`${currentUser}`}</p>
                <a className="logout" onClick={signOut}><FaSignOutAlt size="20px" color="black"/></a>
            </div>
            <div className="search">
                <input type="text" placeholder="Search..." onChange={(event) => setSearchChat(event.target.value)}></input>
            </div>
            <div className="friends">
            {users && users.filter((user) => {
                if(searchChat === '') return user
                
                if(user.username.toLowerCase().includes(searchChat.toLowerCase())) return user

                return null
            }).map((user) => {
                if(user.username === currentUser) {
                    return null
                }
                return <Friend chat={chat} key={user.chatId} currentUser={currentUser} username={user.username} chatId={user.chatId}/>
            })}   
            </div>
        </div>
    )
}

export default ChatList;