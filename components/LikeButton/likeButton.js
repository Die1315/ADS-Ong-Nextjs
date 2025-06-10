import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toggleLike } from '../../service/data-service';
import OngContext from '../../context/ongContext';

const LikeButton = ({ likes, id, post, setPostUpdated }) => {
    const currentOngId = useContext(OngContext)
    let initialState = post.likes.length
    const [like, setLikes] = useState(initialState);
    const [likeColor, setLikeColor] = useState(false)

    const handleLikeClick = () => {
        toggleLike(id).then((res) => {            
            let updatedLikes = post.likes 
            if (res.state === false) {
                updatedLikes = post.likes.filter((ids) => ids!=currentOngId.state)
            } else {
                updatedLikes = post.likes.concat([currentOngId.state])
            }
            setPostUpdated({...post, likes:updatedLikes})            
        })
    };

    useEffect(() => {        
        if (post.likes.includes(currentOngId.state)) {
            setLikeColor(true)
        } else {
            setLikeColor(false)
        }
    }, [post, currentOngId])

    return (
        <button onClick={handleLikeClick} className={`bg-transparent flex flex-col justify-center items-center border-l border-gray-400 px-4 py-2 transition duration-200 text-xs text-white`}>
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 15 }}
                className={likeColor ? "text-secondary" : "text-inherit"}
            />
            <span>{post.likes.length}</span>
        </button>
    );
};

export default LikeButton