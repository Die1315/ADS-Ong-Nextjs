import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const LikeButton = () => {
    const [likes, setLikes] = useState(0);

    const handleLikeClick = () => {
        setLikes(likes + 1);
    };

    return (
        <button className="absolute right-4 top-2 flex items-center space-x-1 px-4 py-2 bg-primary hover:bg-dark text-xs text-white rounded-lg">
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 10 }}
            />
            <span>{likes}</span>
            <span className="sr-only">likes</span>
            <span className="font-medium">Like{likes !== 1 && 's'}</span>
            <span className="sr-only">Click to like</span>
            <button onClick={handleLikeClick} className="sr-only">Like</button>
        </button>
    );
};

export default LikeButton