import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from '@nextui-org/react';
import Image from "next/image";
import Link from "next/link";
import Modal from 'react-modal';

import { getCurrentOng } from "../../../service/data-service";

Modal.setAppElement('#__next');

function CardProfile({ setActiveItem, activeItem, currentOng, isOwner, coverPicture }) {

  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);

  const handleOpenModal1 = () => setModalIsOpen1(true);
  const handleOpenModal2 = () => setModalIsOpen2(true);

  const handleCloseModal1 = () => setModalIsOpen1(false);
  const handleCloseModal2 = () => setModalIsOpen2(false);

  const handlePosts = () => {
    setActiveItem(activeItem === 'Proyectos' ? 'Crear' : 'Proyectos');
  }

  const handleDelete = () => {
    deletePost(post.id).then((post) => {
      setDeleted(false)
      setModalIsOpen(false)
    })

  }

  return (
    <div className="relative flex flex-col w-full">
      <div className="w-full h-32 md:h-48 flex flex-col justify-center items-center relative">
        <Image
          src={coverPicture}
          alt="cover picture"
          fill={true}
          layout="fill"
          object-fit="cover"
          className="rounded-t-md object-cover cursor-pointer"
          onClick={handleOpenModal1}
        />
        <Modal
          isOpen={modalIsOpen1}
          onRequestClose={handleCloseModal1}
          contentLabel="Delete Modal"
          className="post-modal fixed top-0 left-0 z-50 p-5 md:p-0"
          data-modal-backdrop="static"
        >
          <div className="relative">
            <button onClick={handleCloseModal1} className='absolute -top-3 right-4'>
              <FontAwesomeIcon className="fixed text-dark bg-light rounded-full p-2" icon={faTimes} size={30} />
            </button>
            <Image
              src={coverPicture}
              alt="cover picture"
              width={768}
              height={500}
              className="cursor-pointer"
              onClick={handleOpenModal1}
            />
          </div>
        </Modal>
      </div>
      <div className="flex justify-between items-end p-4 pt-0">
        <div className="w-12/12 md:w-3/12 flex items-end gap-5 px-0 ml-0 md:ml-5 -translate-y-4">
          <Image
            src={currentOng.image}
            alt="profile picture"
            width="150"
            height="150"
            className="rounded-full w-24 h-24 object-cover border-4 border-white cursor-pointer"
            onClick={handleOpenModal2}
          />
          <Modal
            isOpen={modalIsOpen2}
            onRequestClose={handleCloseModal2}
            contentLabel="Delete Modal"
            className="post-modal fixed top-0 left-0 z-50 p-5 md:p-0"
            data-modal-backdrop="static"
          >
            <div className="relative">
              <button onClick={handleCloseModal2} className='absolute -top-3 right-4'>
                <FontAwesomeIcon className="fixed text-dark bg-light rounded-full p-2" icon={faTimes} size={30} />
              </button>
              <Image
                src={currentOng.image}
                alt="cover picture"
                width={300}
                height={500}
                className="cursor-pointer"
                onClick={handleOpenModal2}
              />
            </div>
          </Modal>
          <div className="flex flex-col">
            <h1 className="text-center font-bold text-4xl">
              {currentOng.name}
            </h1>
            <p>
              <a
                onClick={() => setActiveItem("Conexiones")}
                className="text-primary text-sm font-bold cursor-pointer"
              >
                {currentOng.following?.length}
              </a>{" "}
              conexiones
            </p>
          </div>
          {isOwner &&
            <Tooltip content={activeItem === "Proyectos" ? "Crear proyecto" : "Ver proyectos"} placement="bottom" color={activeItem === "Proyectos" ? `warning` : `invert`}>
              <button
                onClick={handlePosts}
                className={
                  activeItem != "Crear"
                    ? "text-xl text-secondary"
                    : "text-xl text-dark transform rotate-45"
                }
              >
                <FontAwesomeIcon icon={faPlusCircle} />
              </button>
            </Tooltip>
          }
        </div>
      </div>
    </div>
  );
}

export default CardProfile;
