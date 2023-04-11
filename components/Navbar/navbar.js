import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router"
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUserFriends,
    faComment,
    faBell,
    faUserCircle,
    faArrowRightFromBracket
} from "@fortawesome/free-solid-svg-icons";
import Notifications from "../Notifications/notifications";
import CreateProjectButton from "../CreateProjectButton/createProjectButton";

const logo = require("../../src/images/logo.svg")

const Navbar = ({ createPost }) => {


    const router = useRouter()

    const logout = () => {

        axios.post("/api/logout").then((res) => {
            router.push("/login")
        });

    };

    const [showNotifications, setShowNotifications] = useState(false);
    const [showMenuBurger, setMenuBurger] = useState(false)

    const handleMenu = () => {
        setMenuBurger(true)
    }


    const closeMenu = () => {
        setMenuBurger(false)
    }

    const handleNotificationsClick = () => {
        setShowNotifications(true);
    };
    const closeNotifications = () => {
        setShowNotifications(false);
    };

    return (
        <>
            <nav className="bg-white shadow-sm">
                <div className="container mx-auto">
                    <div className="flex justify-between items-start md:items-center py-2 px-4 md:px-2">
                        <div className="flex justify-start items-center gap-5">
                            <Link href="/dashboard" className="text-gray-800 text-xl font-bold">
                                <Image
                                    src={logo}
                                    alt="logo HelpGo"
                                    width={100}
                                />
                            </Link>
                            {createPost && (<CreateProjectButton />)}
                        </div>
                        <div className="lg:hidden">
                            <button onClick={handleMenu} className="navbar-burger flex items-center text-dark p-3">
                                <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                        {showMenuBurger &&
                            <div className="navbar-menu relative z-50 block md:hidden">
                                <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
                                <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                                    <div className="flex justify-between items-center mb-8">
                                        <Link href="/dashboard" className="text-gray-800 text-xl font-bold">
                                            <Image
                                                src={logo}
                                                alt="logo HelpGo"
                                                width={100}
                                            />
                                        </Link>
                                        <button onClick={closeMenu} className="navbar-close">
                                            <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div>
                                        <ul>
                                            <li className="mb-1">
                                                <Link href="/dashboard" className="block p-4 text-sm font-bold text-dark hover:text-primary">Inicio</Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link href="/connections" className="block p-4 text-sm font-bold text-dark hover:text-primary">Conexiones</Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link href="/messages" className="block p-4 text-sm font-bold text-dark hover:text-primary">Mensajes</Link>
                                            </li>
                                            <li className="mb-1">
                                                <Link href="/profile" className="block p-4 text-sm font-bold text-dark hover:text-primary">Perfil</Link>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="pt-6">
                                            <button onClick={logout} className="btn">Logout</button>
                                        </div>
                                        <p className="my-4 text-xs text-center text-gray-400">
                                            <span>Copyright © 2023 HelpGo</span>
                                        </p>
                                    </div>
                                </nav>
                            </div>}

                        <div className="hidden md:flex items-center gap-2">
                            <Link href="/dashboard" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                                <FontAwesomeIcon
                                    icon={faHome}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Inicio</span>
                            </Link>
                            <Link href="/connections" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                                <FontAwesomeIcon
                                    icon={faUserFriends}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Conexiones</span>
                            </Link>
                            <Link href="/messages" className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">

                                <FontAwesomeIcon
                                    icon={faComment}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Mensajes</span>
                            </Link>
                            <button onClick={handleNotificationsClick} className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Notificaciones</span>
                                {showNotifications && <Notifications closeNotifications={closeNotifications} />}
                            </button>

                            <div className="flex items-center border-l-2 border-gray-300 gap-5 px-5">
                                <Link href="/profile" className="text-dark hover:text-primary">
                                    <FontAwesomeIcon
                                        icon={faUserCircle}
                                        style={{ fontSize: 20 }}
                                    />
                                </Link>
                                <button onClick={logout} className="text-dark hover:text-secondary">
                                    <FontAwesomeIcon
                                        icon={faArrowRightFromBracket}
                                        style={{ fontSize: 20 }}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;