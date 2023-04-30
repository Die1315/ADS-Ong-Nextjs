import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { addMessage, getMessages, getCurrentOng } from "../../service/data-service";

import Picker, { Theme } from "emoji-picker-react";
import { BsEmojiSmileFill } from "react-icons/bs";

import { v4 as uuidv4 } from "uuid";
//import { io } from "socket.io-client";
import Link from "next/link";

function ChatContact({currentChat, currentUser, socket}) {

    const [msg, setMsg] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    const scrollRef = useRef(null);

    const handleEmojiPickerhideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    };

    const handleEmojiClick = (emojiObject, event) => {
        let message = msg;
        message += emojiObject.emoji;
        setMsg(message);
    };

    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState();

    useEffect(() => {
        const getMsg = async () => {
          if (currentChat && currentUser) {
            const response = await getMessages(currentUser.id, currentChat.id);
            setMessages(response);
          }
        };
        getMsg();
      }, [currentChat, currentChat.id, currentUser]);

    useEffect(() => {
        if (socket.current) {
            socket.current.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, [socket]);

    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendChat = async (event) => {
        event.preventDefault();
        if (currentUser) {
            await addMessage(currentUser.id, currentChat.id, msg, "");
            socket.current.emit("send-msg", {
                to: currentChat.id,
                from: currentUser?.id,
                message: msg,
                image: "",
            });
        }
        setMessages((msgs) => [...msgs, { fromSelf: true, message: msg, image: "" }]);
        setMsg("");
    }

    return (
        <>
            <div className={`hidden lg:col-span-2 lg:block ${currentChat == '' ? 'invisible' : ''}`}>
                <div className="w-full">
                    <div className="relative flex items-center p-3 border-b border-gray-300">
                        <img className="object-cover w-10 h-10 rounded-full" src={currentChat?.image} alt="username" />
                        <Link href={`/ong/${currentChat.id}`}><h4 className="block ml-2 font-bold text-gray-600 font-bold">{currentChat?.name}</h4></Link>
                    </div>
                    <div className="relative w-full p-6 overflow-y-auto h-[40rem] scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
                    
                        {messages.map((message) => {
                            return (
                                message?.fromSelf
                                ?
                                <div ref={scrollRef} key={uuidv4()}>
                                    <ul className={`space-y-2 ${!message ? 'invisible' : ''}`}>
                                        <li className="flex justify-end mb-2">
                                            <div className="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                                                <span className="block">{message?.message}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                :
                                <div ref={scrollRef} key={uuidv4()}>
                                    <ul className={`space-y-2 ${!message ? 'invisible' : ''}`}>
                                        <li className="flex justify-start">
                                            <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                                                <span className="block">{message?.message}</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            )
                        })
                        }
                    </div>
                    <form onSubmit={(event) => sendChat(event)}>
                        <div className="flex items-center justify-between w-full p-3 border-t border-gray-300">
                            <Container>
                                <div className="button-container">
                                    <div className="emoji">
                                        <BsEmojiSmileFill onClick={handleEmojiPickerhideShow} />
                                        {showEmojiPicker && (
                                            <div className="emoji-picker-react">
                                                <Picker onEmojiClick={handleEmojiClick} theme={Theme.LIGHT} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Container>
                            <input type="text" placeholder="Message"
                                className="block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-md outline-none focus:text-gray-700"
                                name="message" required 
                                onChange={(e) => setMsg(e.target.value)} value={msg} />
                            <button type="submit">
                                <svg className="w-5 h-5 text-gray-500 origin-center transform rotate-90" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor">
                                    <path
                                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </button>
                        </div>
                    </form>                    
                </div>
            </div>
        </>
    )
}

const Container = styled.div`
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    padding-right: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #b0b3b8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -470px;
        border-color: #9a86f3;
        border-radius: 5%;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
`;
export default ChatContact;