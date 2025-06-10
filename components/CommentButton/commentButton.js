import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from '@fortawesome/free-solid-svg-icons';

import { getComments } from '../../service/data-service';

const CommentButton = ({ postId, modal }) => {
    const [comments, setComments] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleOpenModal = () => {
        if (modalIsOpen == modal) {
            setModalIsOpen(true);
        }
    }

    useEffect(() => {
        getComments(postId).then((comments) => {
            setComments(comments)
        })
    }, [])

    return (
        <button onClick={handleOpenModal} className="flex flex-col justify-center items-center px-4 py-2 bg-transparent border-l border-gray-400 text-xs text-white">
            <FontAwesomeIcon
                icon={faComment}
                style={{ fontSize: 15 }}
            />
            <span>{comments.length}</span>
        </button>
    );
};

export default CommentButton