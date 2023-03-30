import { useState } from "react";

function Notifications() {

    const [showNotifications, setShowNotifications] = useState(false);

    const closeNotifications = () => {
        setShowNotifications(false);
    };

    return (
        <div className="absolute top-16 right-48 z-50 w-80 max-w-full h-80 overflow-y-auto bg-white">
            <div className="p-4">
                <h3 className="text-lg font-medium mb-2">Notificaciones</h3>
                {/* Aquí va el contenido de la notificación */}
            </div>
            <button className="absolute top-0 right-0 m-4 text-gray-400 hover:text-gray-600" onClick={closeNotifications}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
}

export default Notifications