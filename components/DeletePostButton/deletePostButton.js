import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import { deletePost } from '../../service/data-service';

Modal.setAppElement('#__next');

const DeletePostButton = ({ post, setDeleted, deletedPost}) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        setModalIsOpen(true);
    };

    const handleCloseModal = () => setModalIsOpen(false);
    const handleDelete = () => {
        deletePost(post.id).then((post)=>{
            setDeleted(false)
            setModalIsOpen(false)
        })
        
    }

    return (
        <>
            <div className="relative">
                <button onClick={handleOpenModal}
                    className="absolute top-0 right-8 p-2 bg-light text-dark hover:bg-dark hover:text-primary rounded-bl-md border border-gray-200"
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        style={{ fontSize: 15 }}
                    />
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Delete Modal"
                className="post-modal fixed top-0 left-0 z-50 p-5 md:p-0"
                data-modal-backdrop="static"
            >
                <div className='relative w-3/12 p-0 md:p-5 max-h-48 flex flex-col justify-between items-stretch gap-5 bg-light rounded-md mx-auto overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200;'>
                    <button onClick={handleCloseModal} className='absolute -top-3 right-4'>
                        <FontAwesomeIcon className="fixed text-dark bg-light rounded-full p-2" icon={faTimes} size={30} />
                    </button>
                    <p className="text-lg font-medium mb-4">¿Deseas eliminar este proyexto?</p>
                    <div className="flex justify-end">
                        <button
                            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded mr-4"
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </button>
                        <button
                        onClick={handleDelete}
                            className="bg-primary hover:bg-dark text-white font-bold py-2 px-4 rounded"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default DeletePostButton;
