import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toggleLike } from '../../service/data-service';

const LikeButton = ({likes, id}) => {
    console.log(likes)
    let initialState = likes.length
    const [like, setLikes] = useState(initialState);

    const handleLikeClick = () => {
        console.log(id)
        toggleLike(id).then((res)=>{
            console.log(res)
            if(res.state===false){
                setLikes(like - 1);
            } else {
                setLikes(like + 1);
            }
        })
        
    };
    

    return (
        <button  onClick={handleLikeClick}  className="flex flex-col justify-center items-center rounded-full px-4 py-2 transition duration-200 bg-dark hover:bg-secondary text-xs text-white">
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 15 }}
            />
            <span>{like}</span>
            <button className="sr-only">Like</button>
        </button>
    );
};

export default LikeButton