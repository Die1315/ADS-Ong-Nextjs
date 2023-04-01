import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { followUnfollow } from '../../service/data-service';

const FollowButtom = ({ong}) => {
    const [buttomState , toggleButton]  = useState(false)
    const handleFollow = ()=>{
        toggleButton(!buttomState)
        followUnfollow(ong.id)
    }

    return (
        <button onClick={handleFollow} className="text-primary hover:text-dark transition duration-500">
            <FontAwesomeIcon
                icon={buttomState ? faMinusSquare: faPlusSquare }
                style={{ fontSize: 30 }}
                className=""
            />
        </button>
    );
};

export default FollowButtom