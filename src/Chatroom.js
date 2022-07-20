import React, { useState,useEffect } from 'react'
import { db,now } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Message from './Message'
import './Chatroom.css'
import Avatar from 'react-avatar';
import { serverTimestamp } from "firebase/firestore";
import { FaPaperPlane } from "react-icons/fa";


function Chatroom(props) {
    const currentUser = props.user

    //Props
    const chatroom = props.chatroom

    //Messages collection - firestore
    const messageDB = db.collection('messages')
    const messageQuery = messageDB.orderBy('createdAt','asc')
    const checkMessage = messageDB.where("chatroomId", "==", chatroom)
    const [messages] = useCollectionData(messageQuery, {'chatroomId':chatroom})

    const chatroomDB = db.collection('chatrooms')
    const chatroomQuery = chatroomDB.where("chatroomId", "==", chatroom)
    const [chatrooms] = useCollectionData(chatroomQuery)

    //State & Ref hooks
    const [message, setMessage] = useState('')
    const [chatUser, setChatUser] = useState('')

    useEffect(() => {
        if(chatrooms) {
            if(chatrooms[0].user1 !== currentUser.displayName) {
                return setChatUser(chatrooms[0].user1)
            }
            
            return setChatUser(chatrooms[0].user2)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatrooms])    

    const handleMessage = (e) =>{
        e.preventDefault()

        if(message=== '') return
        const {uid, photoURL, displayName} = currentUser
            messageDB.add({
                text: message,
                createdAt: serverTimestamp(),
                uid,
                photoURL,
                displayName,
                chatroom
            })
        setMessage(e.target.reset())
        console.log(message)
    }
    
    return(
        <div className="message-container">
            <div className="message-header">
                <p><Avatar name={chatUser} round="50%" size="40" /> {`${chatUser}`} </p>
            </div>

            <div className="message">
                {messages && messages.map(msg => <Message currentUser={currentUser} chatId={chatroom} key={msg.id} message={msg}/>)}
            </div>
            <div className="message-form" >
                <form onSubmit={handleMessage}>
                    <input className="message-input" placeholder="Send message..." onSubmit={handleMessage} onChange={(e) => setMessage(e.target.value)} type="text" />
                </form>
            </div>
        </div>
    )
}

export default Chatroom