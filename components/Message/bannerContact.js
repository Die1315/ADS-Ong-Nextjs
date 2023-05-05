import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/searchBar";
import { faL } from "@fortawesome/free-solid-svg-icons";
import Image from 'next/image';


function BannerContact({ contacts, currentUser, changeChat, search, setSearch, setIsViewed, isViewed }) {

    const [isActive, setIsActive] = useState(false);

    // const [search, setSearch] = useState("");

    const handleClick = (contact) => {
        setIsActive(contact);
        changeChat(contact);
    };

    const handleView = () => {
        setIsViewed(!isViewed)
    }

    return (
        <div className="w-full md:w-4/12 overflow-hidden">
            <div className="border-r border-gray-200 px-0 md:px-4">
                <h2 className="text-dark font-bold text-lg p-4 md:p-0">Chats</h2>
                <div className="relative text-gray-600">
                   <SearchBar search={search} onSearch={setSearch} displayOnResponsive={false} />
                </div>


                <ul className="overflow-auto mt-5 h-auto">
                    {
                        contacts?.filter((contact)=> contact.name.toLowerCase().includes(search) || contact.email.toLowerCase().includes(search))
                        .map((contact, i) => (
                            <>
                            <li key={i} onClick={() => handleClick(contact)} className={isActive == contact ? 'bg-gray-100' : ''}>
                                <a onClick={handleView}
                                    className={`flex items-center gap-3 px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none ${isViewed ? 'message-notification' : ''}`}>
                                    <Image className="object-cover w-10 h-10 rounded-full"
                                        src={contact.image} alt="username" />
                                    <div className="w-full pb-2">
                                        <div className="flex justify-between">
                                            <span className={isViewed ? "block font-black text-gray-600" : "font-semibold"}>{contact.name}</span>
                                        </div>
                                        <span className="block text-sm text-gray-600">{contact.email}</span>
                                    </div>
                                </a>
                            </li>
                        </>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}


export default BannerContact;