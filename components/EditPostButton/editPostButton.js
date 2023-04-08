import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditPostButton = () => {

    return (
        <div className="relative">
            <button
                className="absolute top-0 right-0 p-2 bg-light text-dark rounded-bl-md"
            >
                <Link href='/edit-post'><FontAwesomeIcon
                    icon={faEdit}
                    style={{ fontSize: 15 }}
                /></Link>
            </button>
        </div>
    );
};

export default EditPostButton;
