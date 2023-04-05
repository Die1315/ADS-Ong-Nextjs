import EditProfileButton from "../EditProfileButton/editProfileButton";
import { useState } from 'react';

function MenuProfile(props) {

    const [activeItem, setActiveItem] = useState("Proyectos");

    return (
        <div className="relative flex justify-between items-center w-full px-4 pb-4">

            <ul className="flex p-0 font-semibold">
                <li onClick={() => props.setActiveItem("Proyectos")} className={activeItem === "Proyectos" ? "active border-r border-gray-200 px-5 hover:underline focus-within:underline hover:cursor-pointer" : "border-r border-gray-200 px-5 hover:underline focus-within:underline hover:cursor-pointer"}>Proyectos</li>
                <li onClick={() => props.setActiveItem("Información")} className={activeItem === "Información" ? "active px-5  border-r border-gray-200  hover:underline focus-within:underline hover:cursor-pointer" : "border-r border-gray-200 px-5 hover:underline focus-within:underline hover:cursor-pointer"}>Información</li>
                <li onClick={() => props.setActiveItem("Conexiones")} className={activeItem === "Conexiones" ? "active px-5 hover:underline focus-within:underline hover:cursor-pointer" : "px-5 hover:underline focus-within:underline hover:cursor-pointer"}>Conexiones</li>
            </ul>
            <EditProfileButton />
        </div >
    )
}

export default MenuProfile;
