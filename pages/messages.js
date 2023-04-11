
import { useState, useEffect, useRef } from "react";
import BannerContact from "../components/Message/BannerContact";
import ChatContact from "../components/Message/chatContact";
import Navbar from "../components/Navbar/navbar";
import { getCurrentOng, getFollowedUsers } from "../service/data-service";

import { io } from "socket.io-client";

function Messages() {

    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);

    const socket = useRef();
    const host = (process.env.HOST || 'localhost') + ':' + (process.env.PORT || 3000);
    // const host = 'http://' + window.location.host;

    useEffect(() => {
        const setUser = async () => {
            const user = await getCurrentOng(true, "");
            setCurrentUser(user);
        }
        setUser();
    },[]);

    useEffect(() => {
        if (currentUser) {
            socket.current = io(host);
            socket.current.emit("add-user", currentUser.id);
            console.log(socket.current);
        }
    },[currentUser]);

    useEffect(() => {
        const getContacts = async() => {
            const { data } = await getFollowedUsers();
            setContacts(data);
        };
        getContacts();
    },[])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="w-8/12 bg-white mx-auto">
                    <div className="container">
                        <div className="h-full border rounded lg:grid lg:grid-cols-3">
                            <BannerContact contacts={contacts} setContact={setContact}/>
                            <ChatContact contact={contact} currentUser={currentUser} socket={socket} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Messages;
