import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

function MenuProfile(props) {

    const [activeItem, setActiveItem] = useState("Proyectos");

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <div className="relative flex flex-col-reverse md:flex-row gap-5 md:gap-0 justify-between items-center w-full px-4 pb-4">

            <ul className="flex p-0 font-semibold">
                <li onClick={() => props.setActiveItem("Proyectos")} className={activeItem === "Proyectos" ? "active border-r border-gray-200 px-5 hover:underline focus-within:underline hover:cursor-pointer" : "border-r border-gray-200 px-5 hover:underline focus-within:underline hover:cursor-pointer"}>Proyectos</li>
                <li onClick={() => props.setActiveItem("Información")} className={activeItem === "Información" ? "active px-5  border-r border-gray-200  hover:underline focus-within:underline hover:cursor-pointer" : "border-r border-gray-200 px-5 hover:underline focus-within:underline hover:cursor-pointer"}>Información</li>
                <li onClick={() => props.setActiveItem("Conexiones")} className={activeItem === "Conexiones" ? "active px-5 hover:underline focus-within:underline hover:cursor-pointer" : "px-5 hover:underline focus-within:underline hover:cursor-pointer"}>Conexiones</li>
            </ul>

            <div id="edit-profile" className="relative">
                <button
                    className={isOpen ? "bg-gray-400 font-bold rounded-full border border-gray-400 p-4 text-sm flex items-center justify-center gap-3" : "bg-light font-bold rounded-full border border-gray-200 p-4 text-sm flex items-center justify-center gap-3"}
                    onClick={toggleMenu}
                >
                    <FontAwesomeIcon
                        icon={faGear}
                        style={{ fontSize: 12 }}
                    />
                </button>

                {isOpen && (
                    <div className="absolute bottom-2 right-0 transform -translate-y-10 w-48 rounded-md bg-light border border-gray-200 divide-y divide-gray-200 focus:outline-none">
                        <ul>
                            <li
                                onClick={() => props.setActiveItem("Portada")}
                                className="block px-4 py-3 text-sm rounded-t-md text-dark hover:underline hover:cursor-pointer"
                            >
                                Editar portada
                            </li>
                            <li
                                onClick={() => props.setActiveItem("Perfil")}
                                className="block px-4 py-3 text-sm rounded-b-md text-dark hover:underline hover:cursor-pointer"
                            >
                                Editar perfil
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </div >
    )
}

export default MenuProfile;
