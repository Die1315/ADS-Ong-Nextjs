import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import Image from 'next/image';
import Link from 'next/link';

import LikeButton from '../LikeButton/likeButton'
import CommentButton from '../CommentButton/commentButton'
import EditPostButton from '../EditPostButton/editPostButton'
import CommentsBox from '../CommentsBox/commentsBox';

import { formatDate } from '../../utils/dateUtils';

Modal.setAppElement('#__next');

const Post = ({isOwner,post }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [postData, setPostUpdated] = useState(post)
    const handleOpenModal = () => setModalIsOpen(true);
    const handleCloseModal = () => setModalIsOpen(false);


    const [showFullDescription, setShowFullDescription] = useState(false);
    const shortDescription = postData.description.slice(0, 120);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="relative">
                {isOwner && <EditPostButton post={postData} setPostUpdated={setPostUpdated}/>}
                <Image className="w-full object-cover min-h-80 max-h-80" src={postData.image} alt="Post" width={800} height={600} />
                <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-50 w-full">
                    <div className="relative w-full flex justify-between items-stretch pl-4">
                        <div className="w-8/12 md:w-10/12 overflow-hidden flex gap-2 py-1">
                            <Image className="object-cover w-10 h-10 rounded-full" src={postData.owner.image} alt="User Profile" width={200} height={200} />
                            <div className="w-12/12">
                                <p className="text-white font-bold text-lg hover:cursor-pointer" onClick={handleOpenModal}>{postData.owner.name}</p>
                                <p className="text-gray-300 text-sm">De <span className="text-primary hover:cursor-pointer" onClick={handleOpenModal}>{`${formatDate(postData.startdate.toString())}`}</span> a <span className="text-primary hover:cursor-pointer" onClick={handleOpenModal}>{postData.enddate && `${formatDate(postData.enddate.toString())}`}</span></p>
                            </div>
                        </div>
                        <div className='w-2/12 flex items-stretch justify-end'>
                            <div className="flex">
                                <CommentButton postId={postData.id} modal={modalIsOpen} />
                                <LikeButton likes={postData.likes} id={postData.id} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-medium text-gray-900 hover:cursor-pointer" onClick={handleOpenModal}>{postData.title}</h3>
                <p className="text-gray-700 text-base mb-2">{showFullDescription ? postData.description : shortDescription}{postData.description.length < 120 || showFullDescription ? "" : "..."}</p>
                {postData.description.length > 120 && (
                    <button className=" bg-secondary text-dark rounded-md px-6 py-2 text-xs font-medium" onClick={toggleDescription}>
                        {showFullDescription ? 'Leer menos' : 'Leer más'}
                    </button>
                )}
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Post Modal"
                className="post-modal fixed top-0 left-0 z-50 p-5 md:p-0"
                data-modal-backdrop="static"
            >
                <div className='relative container p-0 md:p-5 max-h-90 md:max-h-screen flex flex-col md:flex-row justify-between items-stretch bg-light rounded-md mx-auto overflow-x-hidden overflow-y-auto md:overflow-y-hidden'>
                    <button onClick={handleCloseModal} className='absolute -top-3 right-4'>
                        <FontAwesomeIcon className="fixed text-dark bg-light rounded-full p-2" icon={faTimes} size={30} />
                    </button>

                    <div className="w-12/12 md:w-7/12 p-4 flex flex-col items-start border-0 md:border-r border-gray-200">
                        <Image
                            src={postData.image}
                            alt="Post Image"
                            width={800}
                            height={500}
                        />
                        <h2 className="text-2xl font-bold mt-4">{postData.title}</h2>
                        <p className="text-dark text-sm">De <span className="text-primary font-bold hover:text-dark hover:cursor-pointer" onClick={handleOpenModal}>{`${formatDate(postData.startdate.toString())}`}</span> a <span className="text-primary font-bold hover:text-dark hover:cursor-pointer" onClick={handleOpenModal}>{postData.enddate && `${formatDate(postData.enddate.toString())}`}</span></p>
                        <p className="text-gray-600 mt-2">{postData.description}</p>
                    </div>
                    <div className='w-12/12 md:w-5/12 flex flex-col justify-start items-start p-4 gap-5'>
                        <div className='flex justify-start items-start gap-3'>
                            <Link href={`/ong/${postData.owner}`}>
                                <Image
                                    src={postData.owner.image}
                                    alt="Post Image"
                                    width={200}
                                    height={200}
                                    className="object-cover w-12 h-12 rounded-full"
                                />
                            </Link>
                            <div className='flex flex-col'>
                                <Link href={`/ong/${postData.owner.id}`}>
                                    <h4 className="text-dark font-bold text-lg hover:cursor-pointer">{postData.owner.name}</h4>
                                </Link>
                                <p className='text-sm'>Categoría</p>
                            </div>
                        </div>
                        <div className='w-full flex justify-start items-center gap-2'>
                            <h3 className='font-bold'>Recursos: </h3><p className='text-sm m-0'> {postData.resources}</p>
                        </div>
                        <CommentsBox postId={postData.id} />
                    </div>
                </div>
            </Modal>
        </div >
    );
};


export default Post;
