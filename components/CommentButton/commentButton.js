import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from '@fortawesome/free-solid-svg-icons';

const CommentButton = () => {
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    return (
        <button className="flex flex-col justify-center items-center px-4 py-2 transition duration-500 bg-dark hover:bg-primary text-xs text-white">
            <FontAwesomeIcon
                icon={faComment}
                style={{ fontSize: 15 }}
            />
            <span>{likes}</span>
            <button onClick={handleLikeClick} className="sr-only">Like</button>
        </button>
    );
};

export default CommentButton