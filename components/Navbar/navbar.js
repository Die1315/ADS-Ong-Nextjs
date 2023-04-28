import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Image from "next/image";
import Link from "next/link";
import Modal from 'react-modal';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHome,
    faUserFriends,
    faComment,
    faBell,
    faUserCircle,
    faArrowRightFromBracket,
    faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

import CreateProjectButton from "../CreateProjectButton/createProjectButton";
import NotificationsContainer from "../NotificationsContainer/notificationsContainer";

import { getMessages } from "../../service/data-service";
const logo = require("../../src/images/logo.svg")

Modal.setAppElement('#__next');

const notifications = [
    {
        id: 1,
        title: 'Nueva conexión',
        message: 'Tienes una nueva conexión en LinkedIn',
        time: 'Hace 2 horas',
    },
    {
        id: 2,
        title: 'Mensaje nuevo',
        message: 'Tienes un mensaje nuevo en LinkedIn',
        time: 'Hace 5 horas',
    },
];

const Navbar = ({ createPost }) => {

    const router = useRouter()

    const logout = () => {

        axios.post("/api/logout").then((res) => {
            router.push("/login")
        });

    };

    const [showMenuBurger, setMenuBurger] = useState(false)
    const [messageNotification, setMessageNotification] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleModal = () => setModalIsOpen(!modalIsOpen);

    const handleMenu = () => {
        setMenuBurger(true)
    }

    const closeMenu = () => {
        setMenuBurger(false)
    }

    useEffect(() => {
        getMessages(true).then((messageNotification) => {
            setMessageNotification(messageNotification);
        });
    }, [])

    return (
        <>
            <nav className="bg-white shadow-sm ">
                <div className="container relative mx-auto">
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
                                                <Link href="/ongfind" className="block p-4 text-sm font-bold text-dark hover:text-primary">Descubrir</Link>
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
                            <Link href="/messages" className={`text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs ${messageNotification && `message-notification`}`}>

                                <FontAwesomeIcon
                                    icon={faComment}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Mensajes</span>
                            </Link>
                            <Link href="/ongfind" className={`text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs`}>

                                <FontAwesomeIcon
                                    icon={faLocationDot}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Descubrir</span>
                            </Link>
                            <button onClick={handleModal} className="text-gray-700 mx-4 hover:text-gray-400 flex flex-col justify-center items-center gap-1 text-xs cursor-pointer">
                                <FontAwesomeIcon
                                    icon={faBell}
                                    style={{ fontSize: 15 }}
                                />
                                <span>Notificaciones</span>
                            </button>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={handleModal}
                                contentLabel="Notifications"
                                className="box-content "
                                preventScroll={false}
                                data-modal-backdrop="static"
                                style={
                                    {
                                        overlay: { backgroundColor: 'transparent' }
                                    }
                                }
                            >
                                <div className='absolute top-16 right-48 w-auto p-0 max-h-90 flex flex-col justify-between items-stretch gap-5 bg-light rounded-md mx-auto overflow-hidden;'>
                                    {/*<button className='absolute -top-3 right-4' onClick={handleCloseModal}>
                                            <FontAwesomeIcon className="fixed text-dark bg-light rounded-full p-2" icon={faTimes} size={30} />
                                </button>*/}
                                    <NotificationsContainer notifications={notifications} />
                                </div>
                            </Modal>

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