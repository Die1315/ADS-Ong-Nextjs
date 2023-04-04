import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfile = () => {

    return (
        <div className="relative">
            <button
                className="absolute rounded-full bg-dark px-1 text-white top-6 left-0 transform translate-x-1/2 -translate-y-1/2"
            >
                <Link href='#'><FontAwesomeIcon
                    icon={faEdit}
                    style={{ fontSize: 15 }}
                /></Link>
            </button>
        </div>
    );
};

export default EditProfile;
