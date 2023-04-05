import { useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import LikeButton from '../LikeButton/likeButton'
import CommentButton from '../CommentButton/commentButton'
import EditPostButton from '../EditPostButton/editPostButton'
import CommentsBox from '../CommentsBox/commentsBox';

import { formatDate } from '../../utils/dateUtils';

Modal.setAppElement('#__next');

const Post = ({ key, title, description, image, startDate, endDate, userProfilePic, userName, lat, likes, resources }) => {

    const exampleComments = [
        'Este es un comentario de ejemplo',
        'Este es otro comentario de ejemplo',
        'Este es el tercer comentario de ejemplo'
    ];


    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => setModalIsOpen(true);
    const handleCloseModal = () => setModalIsOpen(false);


    const [showFullDescription, setShowFullDescription] = useState(false);
    const shortDescription = description.slice(0, 120);
    console.log(key, title, description, image, startDate, endDate, userProfilePic, userName, resources)
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="relative">
                <EditPostButton />
                <div>
                    <Link href="#" onClick={handleOpenModal} className="absolute top-0 right-0 bg-white hover:bg-dark rounded-bl-md px-4 py-2 text-primary hover:font-bold">Ver mapa</Link>
                </div>
                <Image className="w-full object-cover min-h-80 max-h-80" src={image} alt="Post" width={800} height={600} />
                <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-50 w-full">
                    <div className="relative w-full flex justify-between items-stretch pl-4">
                        <div className="w-10/12 overflow-hidden flex gap-2 py-1">
                            <Image className="object-cover w-10 h-10 rounded-full" src={userProfilePic} alt="User Profile" width={40} height={40} />
                            <div className="w-12/12">
                                <p className="text-white font-bold text-lg hover:cursor-pointer" onClick={handleOpenModal}>{userName}</p>
                                <p className="text-gray-300 text-sm">De <span className="text-primary hover:cursor-pointer" onClick={handleOpenModal}>{`${formatDate(startDate.toString())}`}</span> a <span className="text-primary hover:cursor-pointer" onClick={handleOpenModal}>{endDate && `${formatDate(endDate.toString())}`}</span></p>
                            </div>
                        </div>
                        <div className='w-2/12 flex items-stretch justify-end'>
                            <CommentButton />
                            <LikeButton likes={likes} id={key} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-medium text-gray-900 hover:cursor-pointer" onClick={handleOpenModal}>{title}</h3>
                <p className="text-gray-700 text-base mb-2">{showFullDescription ? description : shortDescription}{description.length < 120 || showFullDescription ? "" : "..."}</p>
                {description.length > 120 && (
                    <button className=" bg-secondary text-dark rounded-md px-6 py-2 text-xs font-medium" onClick={toggleDescription}>
                        {showFullDescription ? 'Leer menos' : 'Leer más'}
                    </button>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Post Modal"
                className="post-modal fixed top-0 left-0 z-50"
                data-modal-backdrop="static"
            >
                <div className='relative container flex justify-between items-stretch bg-light p-5 rounded-md mx-auto'>
                    <button onClick={handleCloseModal} className='absolute -top-3 -right-2 text-dark bg-light rounded-full w-6 h-6'>
                        <FontAwesomeIcon className="" icon={faTimes} size={30} />
                    </button>

                    <div className="w-12/12 md:w-7/12 p-4 flex flex-col items-start border-r border-gray-200">
                        <Image
                            src={image}
                            alt="Post Image"
                            width={800}
                            height={500}
                        />
                        <h2 className="text-2xl font-bold mt-4">{title}</h2>
                        <p className="text-dark text-sm">De <span className="text-primary font-bold hover:text-dark hover:cursor-pointer" onClick={handleOpenModal}>{`${formatDate(startDate.toString())}`}</span> a <span className="text-primary font-bold hover:text-dark hover:cursor-pointer" onClick={handleOpenModal}>{endDate && `${formatDate(endDate.toString())}`}</span></p>
                        <p className="text-gray-600 mt-2">{description}</p>
                    </div>
                    <div className='w-12/12 md:w-5/12 flex flex-col justify-between items-start p-4 gap-5'>
                        <div className='flex justify-start items-start gap-3'>
                            <Image
                                src={userProfilePic}
                                alt="Post Image"
                                width={50}
                                height={50}
                                className='rounded-full'
                            />
                            <div className='flex flex-col'>
                                <p className="text-dark font-bold text-lg hover:cursor-pointer">{userName}</p>
                                <p className='text-sm'>Categoría</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-start items-center gap-2'>
                            <h3 className='font-bold'>Recursos: </h3><p className='text-sm m-0'> {resources}</p>
                        </div>
                        <CommentsBox comments={exampleComments} />
                    </div>
                </div>
            </Modal>
        </div >
    );
};


export default Post;
