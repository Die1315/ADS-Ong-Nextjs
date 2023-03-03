import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


import {
    faHome,
    faUserFriends,
    faComment,
    faBell,
    faUserCircle,
    faPlus,
} from "@fortawesome/free-solid-svg-icons";

const logo = require("../../src/images/logo.svg")

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto">
                <div className="flex justify-between items-center py-2">
                    <div className="flex justify-start">
                        <Link href="/dashboard" className="text-gray-800 text-xl font-bold">
                            <Image
                                src={logo}
                                alt="logo HelpGo"
                                width={100}
                            />
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <Link href="#" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                            <FontAwesomeIcon
                                icon={faHome}
                                style={{ fontSize: 15}}
                            />
                            <span>Inicio</span>
                        </Link>
                        <Link href="#" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                            <FontAwesomeIcon
                                icon={faUserFriends}
                                style={{ fontSize: 15}}
                            />
                            <span>Conexiones</span>
                        </Link>
                        <Link href="#" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                            <FontAwesomeIcon
                                icon={faComment}
                                style={{ fontSize: 15}}
                            />
                            <span>Mensajes</span>
                        </Link>
                        <Link href="#" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                            <FontAwesomeIcon
                                icon={faBell}
                                style={{ fontSize: 15}}
                            />
                            <span>Notificaciones</span>
                        </Link>

                        <div className="flex items-center border-l-2 border-gray-300">
                            <Link href="#" className="text-gray-700 mx-4 hover:text-gray-400">
                                <FontAwesomeIcon
                                    icon={faUserCircle}
                                    style={{ fontSize: 20}}
                                />
                            </Link>
                            <Link href="#" className="text-gray-700 mx-4 hover:text-primary">
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    style={{ fontSize: 20}}
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;