import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div id="edit-profile" className="relative">
      <button
        className="bg-white rounded-full p-1 w-8 absolute top-8 left-0 transform translate-x-1/2 -translate-y-1/2 hover:bg-gray-100 transition-all duration-200"
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
                icon={faGear}
                style={{ fontSize: 15 }}
            />
      </button>

      {isOpen && (
        <div className="absolute top-8 left-4 mt-4 w-48 rounded-md bg-white divide-y divide-gray-100 focus:outline-none">
          <div>
            <Link
              href="#"
              className="block px-4 py-3 text-sm rounded-t-md text-gray-700 hover:bg-primary hover:text-gray-900"
            >
              Editar logo
            </Link>
            <Link
              href="#"
              className="block px-4 py-3 text-sm rounded-b-md text-gray-700 hover:bg-primary hover:text-gray-900"
            >
              Editar perfil
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
