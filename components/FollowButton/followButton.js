import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const LikeButton = () => {

    return (
        <button className="text-primary hover:text-dark">
            <FontAwesomeIcon
                icon={faPlusSquare}
                style={{ fontSize: 30 }}
                className=""
            />
        </button>
    );
};

export default LikeButton