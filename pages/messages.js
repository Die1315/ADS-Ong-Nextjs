
import { useState, useEffect } from "react";
import BannerContact from "../components/Message/BannerContact";
import ChatContact from "../components/Message/chatContact";
import Navbar from "../components/Navbar/navbar";
import { getFollowedUsers } from "../service/data-service";


function Messages() {

    const [contacts, setContacts] = useState([]);
    const [contact, setContact] = useState([]);


    useEffect(() => {
        const getContacts = async () => {
            const { data } = await getFollowedUsers();
            setContacts(data);
        };
        getContacts();
    }, [])

    return (
        <div>
            <Navbar />
            <div className="h-screen w-full flex justify-center py-5 px-5 md:px-0">
                <div className="container mx-auto">
                    <div className="h-full bg-white border rounded grid grid-cols-1 md:grid-cols-3">
                        <BannerContact contacts={contacts} setContact={setContact} />
                        <ChatContact contact={contact} />
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Messages;
