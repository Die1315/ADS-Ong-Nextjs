
import { useState, useEffect, useRef } from "react";
import BannerContact from "../components/Message/BannerContact";
import ChatContact from "../components/Message/chatContact";
import Navbar from "../components/Navbar/navbar";
import { getCurrentOng, getFollowedUsers } from "../service/data-service";

function Messages() {

    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState();


    const [contact, setContact] = useState([]);

    useEffect(() => {
        const setUser = async () => {
            const user = await getCurrentOng(true, "");
            setCurrentUser(user);
        }
        setUser();
    },[]);

    useEffect(() => {
        const getContacts = async() => {
            if (currentUser) {
                const { data } = await getFollowedUsers();
                setContacts(data);
            }
        };
        getContacts();
    },[currentUser])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="w-8/12 bg-white mx-auto">
                    <div className="container">
                        <div className="h-full border rounded lg:grid lg:grid-cols-3">
                            <BannerContact contacts={contacts} setContact={setContact}/>
                            <ChatContact contact={contact} currentUser={currentUser}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Messages;
