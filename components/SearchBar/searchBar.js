import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ search, onSearch }) => {
    return (
        <div className="w-full bg-white rounded-md shadow-sm flex items-center p-5">
            <input
                className="w-10/12 h-12 bg-gray-100 rounded-l-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus-within:border-gray-500"
                type="text"
                placeholder="Buscar..."
                value={search}
                onChange={(event) => {
                console.log(event.target.value);
                onSearch(event.target.value);
                }}
            />
            <button className="w-2/12 h-12 bg-primary hover:bg-dark rounded-r-full text-white font-bold py-2 px-4">

                <FontAwesomeIcon
                    icon={faSearch}
                    style={{ fontSize: 15 }} />
            </button>
        </div>
    );
};

export default SearchBar;
