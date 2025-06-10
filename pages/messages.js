
import { useState, useEffect, useRef } from "react";
import BannerContact from "../components/Message/bannerContact";
import ChatContact from "../components/Message/chatContact";
import Navbar from "../components/Navbar/navbar";
import { getCurrentOng, getFollowedUsers } from "../service/data-service";
import { io } from "socket.io-client";

function Messages() {

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState();
    const [currentChat, setCurrentChat] = useState(undefined);
    const [search, setSearch] = useState("");
    const [isViewed, setIsViewed] = useState(false)
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
          // In production, socket.io will automatically connect to the same host
          // In development, we can specify localhost:3000
          const socketURL = process.env.NODE_ENV === 'production' 
            ? 'https://ads-ong-nextjs-production.up.railway.app/' // Let socket.io auto-detect the host
            : 'http://localhost:3000';
          
          socket.current = io(socketURL);
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
            <div className="container mx-auto w-full py-5 flex justify-center items-center">
                <div className="w-10/12 bg-white rounded-md mx-auto">
                    <div className="container">
                        <div className="min-h-85 border rounded flex flex-col md:flex-row">
                            <BannerContact 
                                contacts={contacts} 
                                currentUser={currentUser} 
                                currentChat={currentChat}
                                changeChat={handleChatChange}
                                search={search}
                                setSearch={setSearch}
                                isViewed={isViewed}
                                setIsViewed={setIsViewed}/>
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
                                        isViewed={isViewed}
                                        setIsViewed={setIsViewed}
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
