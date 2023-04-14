
import { useState, useEffect, useRef } from "react";
import BannerContact from "../components/Message/BannerContact";
import ChatContact from "../components/Message/chatContact";
import Navbar from "../components/Navbar/navbar";
import { getCurrentOng, getFollowedUsers } from "../service/data-service";
import { io } from "socket.io-client";

function Messages() {

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [currentChat, setCurrentChat] = useState(undefined);

    const host = (process.env.HOST || 'localhost') + ':' + (process.env.PORT || 3000);
    const socket = useRef();

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
        }
      }, [currentUser]);

    useEffect(() => {
        const getContacts = async() => {
            if (currentUser) {
                const { data } = await getFollowedUsers();
                setContacts(data);
            }
        };
        getContacts();
    },[currentUser]);

    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="w-10/12 bg-white mx-auto">
                    <div className="container">
                        <div className="h-full border rounded lg:grid lg:grid-cols-3">
                            <BannerContact 
                                contacts={contacts} 
                                currentUser={currentUser} 
                                changeChat={handleChatChange}/>
                            {
                                currentChat === undefined ?
                                (
                                    <></>
                                )
                                :
                                (
                                    <ChatContact 
                                        currentChat={currentChat}
                                        currentUser={currentUser}
                                        socket={socket}
                                        />
                                )
                            }                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default Messages;
