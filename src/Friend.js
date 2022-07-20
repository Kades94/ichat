import React from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db } from './firebase'
import Avatar from 'react-avatar';
import './Friend.css'

function Friend(props) {
    const currentUser = props.currentUser
    const usersDB = db.collection("users")
    const userQuery = usersDB.where("username", "==", currentUser)
    const [user] = useCollectionData(userQuery)

    const username = props.username
    const chatId = props.chatId
    const chat = props.chat

    return (
        <div className="friend" onClick={
            () => {
                chat(
                {
                    chatId: user[0].chatId, 
                    username: user[0].username
                }, 
                {
                    chatId: chatId,
                    username: username
                }
                )
            }
        }>
        <Avatar name={username}round="50%" size="35" /> {`${username}`}</div>
    )
}

export default Friend