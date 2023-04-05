import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { followUnfollow } from '../../service/data-service';


const FollowButton = ({ ong }) => {
    const [buttomState, toggleButton] = useState(false)
    const handleFollow = () => {
        toggleButton(!buttomState)
        followUnfollow(ong.id)
    }

    return (
        <button onClick={handleFollow} className={buttomState ? "text-dark rounded-full" : "text-primary rounded-full"}>
            <FontAwesomeIcon
                icon={buttomState ? faMinusCircle : faPlusCircle}
                style={{ fontSize: 30 }}

            />
        </button>
    );
};


export default FollowButton
