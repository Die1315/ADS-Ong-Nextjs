
import { useState, useEffect } from "react";
import BannerContact from "../components/Message/BannerContact";
import ChatContact from "../components/Message/chatContact";
import Navbar from "../components/Navbar/navBar";

import { getFollowedUsers } from "../service/data-service";


function Messages() {

    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState([]);
    

    useEffect(() => {
        const getContacts = async() => {
            const { data } = await getFollowedUsers();
            setContacts(data);
        };
        getContacts();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="container mx-auto">
                <div className="w-8/12 bg-white mx-auto">
                    <div className="container">
                        <div className="h-full border rounded lg:grid lg:grid-cols-3">
                            <BannerContact contacts={contacts} setContact={setContact}/>
                            <ChatContact contact={contact}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Messages;
