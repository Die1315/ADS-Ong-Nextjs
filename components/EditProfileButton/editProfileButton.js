import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const EditProfileButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div id="edit-profile" className="relative">
      <button
        className={isOpen ? "bg-gray-400 font-bold rounded-full border border-gray-400 p-4 text-sm flex items-center justify-center gap-3" : "bg-light font-bold rounded-full border border-gray-200 p-4 text-sm flex items-center justify-center gap-3"}
        onClick={toggleMenu}
      >
        <FontAwesomeIcon
                icon={faGear}
                style={{ fontSize: 12 }}
            />
      </button>

      {isOpen && (
        <div className="absolute bottom-2 right-0 transform -translate-y-10 w-48 rounded-md bg-light border border-gray-200 divide-y divide-gray-200 focus:outline-none">
          <div>
            <Link
              href="#"
              className="block px-4 py-3 text-sm rounded-b-md text-gray-700 hover:bg-primary hover:text-gray-900"
            >
              Editar portada
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

export default EditProfileButton;
