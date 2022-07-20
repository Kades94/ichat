import React, { useState } from 'react'
import { db } from './firebase'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import './Message.css'

function Message(props) {
    const currentUser = props.currentUser;
    const {text, uid,displayName, chatroom, createdAt} = props.message
    const chatId = props.chatId

    return (

        <div className={`contain ${displayName == currentUser.displayName ? 'mine': 'yours'}`}>
        {chatId == chatroom ? 
            <div className="box">
                <div className="message-text">{text}</div>
            </div>
        :<div></div>}
        </div>
    )
}

export default Message