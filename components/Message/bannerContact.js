import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/searchBar";

function BannerContact({ contacts, setContact }) {


    const [isActive, setIsActive] = useState(false);

    const [search, setSearch] = useState("");

    const handleClick = (contact) => {
        setIsActive(contact);
        setContact(contact);
    };

    return (
        <div>
            <div className="border-r border-gray-200 lg:col-span-1 p-4">
                <h2 className="text-dark font-bold text-lg">Chats</h2>
                <div className="relative text-gray-600">
                    <SearchBar search={search} onSearch={setSearch} displayOnResponsive={true} />
                    <SearchBar search={search} onSearch={setSearch} displayOnResponsive={false} />
                </div>


                <ul className="overflow-auto mt-5 h-auto">
                    {
                        contacts?.map((contact) => (
                            <li key={contact.id} onClick={() => handleClick(contact)} className={isActive == contact ? 'bg-gray-100' : ''}>
                                <a
                                    className={`flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none`}>
                                    <img className="object-cover w-10 h-10 rounded-full"
                                        src={contact.image} alt="username" />
                                    <div className="w-full pb-2">
                                        <div className="flex justify-between">
                                            <span className="block ml-2 font-semibold text-gray-600">{contact.name}</span>
                                        </div>
                                        <span className="block ml-2 text-sm text-gray-600">{contact.email}</span>
                                    </div>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}


export default BannerContact;