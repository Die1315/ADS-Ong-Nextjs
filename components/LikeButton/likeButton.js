import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = () => {
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    return (
        <button className="flex flex-col justify-center items-center rounded-full px-4 py-2 transition duration-200 bg-dark hover:bg-secondary text-xs text-white">
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 15 }}
            />
            <span>{likes}</span>
            <button onClick={handleLikeClick} className="sr-only">Like</button>
        </button>
    );
};

export default LikeButton