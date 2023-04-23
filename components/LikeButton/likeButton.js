import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toggleLike } from '../../service/data-service';

const LikeButton = ({ likes, id, idOwner, post, setPostUpdated }) => {
    console.log(likes)
    let initialState = post.likes.length
    const [like, setLikes] = useState(initialState);
    const [likeColor, setLikeColor] = useState(false)

    const handleLikeClick = () => {
        //console.log(id)
        toggleLike(id).then((res) => {
            console.log(res)
            if (res.state === false) {
                setLikes(like - 1);
                setLikeColor(false)
            } else {
                setLikes(like + 1);
                setLikeColor(true)
            }
        })
    };

    useEffect(() => {
        console.log(post.likes, post.owner.id)
        if (post.likes.includes(post.owner.id)) {
            console.log(likes)
            setLikeColor(true)
        } else {
            setLikeColor(false)
        }
    }, [like])

    return (
        <button onClick={handleLikeClick} className={`bg-transparent flex flex-col justify-center items-center border-l border-gray-400 px-4 py-2 transition duration-200 text-xs text-white`}>
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 15 }}
                className={likeColor ? "text-secondary" : "text-inherit"}
            />
            <span>{like}</span>
        </button>
    );
};

export default LikeButton