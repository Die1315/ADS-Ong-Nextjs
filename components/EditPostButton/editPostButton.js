import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTimes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';

import ProjectForm from '../ProjectForm/projectForm'
import { getPost } from '../../service/data-service';

Modal.setAppElement('#__next');

const EditPostButton = ({ post, setPostUpdated  }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    
    const handleOpenModal = () => {
            setModalIsOpen(true);
          };        
        
    const handleCloseModal = () => setModalIsOpen(false);
    

    return (
        <>
            <div className="relative">
                <button onClick={handleOpenModal}
                    className="absolute top-0 right-0 p-2 bg-light text-dark hover:bg-dark hover:text-primary border border-gray-200"
                >
                    <FontAwesomeIcon
                        icon={faEdit}
                        style={{ fontSize: 15 }}
                    />
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Post Modal"
                className="post-modal fixed top-0 left-0 z-50 p-5 md:p-0"
                data-modal-backdrop="static"
            >
                <div className='relative w-12/12 md:w-5/12 p-5 max-h-90 flex flex-col justify-between items-stretch gap-5 bg-light rounded-md mx-auto overflow-x-hidden overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200;'>
                    <button onClick={handleCloseModal} className='absolute -top-3 right-4'>
                        <FontAwesomeIcon className="fixed text-dark bg-light rounded-full p-2" icon={faTimes} size={30} />
                    </button>
                    <h2 className='text-xl font-bold'>Editar proyecto</h2>
                    <ProjectForm postToUpdate={post} setPostUpdate={setPostUpdated} closeModal={handleCloseModal}/>
                </div>
            </Modal>
        </>
    );
};

export default EditPostButton;
