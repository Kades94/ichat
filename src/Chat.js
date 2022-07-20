import React, { useState } from 'react'
import { db } from './firebase'
import './Chat.css'
import ChatList from './ChatList'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Chatroom from './Chatroom'


function Chat(props) {
    const [chatroom, setChatroom] = useState('')
    const chatroomDB = db.collection('chatrooms')
    const [chatrooms] = useCollectionData(chatroomDB)
    const user=props.user

    const chat = (user1, user2) =>{
        if(user1.chatId === undefined || user2.chatId === undefined) {
            return console.log("Chat Id Invalid")
        }

        const chatroomId = (Math.random() + 1).toString(36).substring(2);
        let checkChatroom = false;

        chatrooms.forEach((chatroom) => {
            if(chatroom.user2 === user1.username && chatroom.user1 === user2.username) {
                setChatroom(chatroom.chatroomId)
                return checkChatroom = true;
            }

            if(chatroom.user1 === user1.username && chatroom.user2 === user2.username) {
                setChatroom(chatroom.chatroomId)
                return checkChatroom = true;
            }
        })
        if(checkChatroom) return

        chatroomDB.add({
            chatroomId: chatroomId,
            user1: user1.username,
            user2: user2.username,
        })

        return setChatroom(chatroomId)
    }

    return (
        <div className="container">
            <div className="chat">
                <div className="sidebar" ><ChatList user={user} chat={chat}/></div>

                {chatroom ? (<div className="chatbox"><Chatroom user={user} chatroom={chatroom}  /></div>):(<div className="chatbox">{`${chatroom}`}</div>)}
            </div>
        </div>
    )
}

export default Chat