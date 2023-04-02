import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const FollowButton = () => {

    return (
        <button className="text-primary hover:text-dark transition duration-500">
            <FontAwesomeIcon
                icon={faPlusSquare}
                style={{ fontSize: 30 }}
                className=""
            />
        </button>
    );
};

export default FollowButton