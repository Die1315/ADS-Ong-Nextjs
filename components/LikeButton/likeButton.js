import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { toggleLike } from '../../service/data-service';

const LikeButton = ({likes, id}) => {
    console.log(likes)
    let initialState = likes.length
    const [like, setLikes] = useState(initialState);

    const handleLikeClick = () => {
        //console.log(id)
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
        <button  onClick={handleLikeClick}  className="bg-transparent hover:bg-secondary text-white flex flex-col justify-center items-center border-l border-gray-400 px-4 py-2 transition duration-200 text-xs">
            <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: 15 }}
                className={like ? "text-secondary" : "text-inherit"}
            />
            <span>{like}</span>
        </button>
    );
};

export default LikeButton