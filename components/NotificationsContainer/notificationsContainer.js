import React from 'react';
import Notifications from '../Notifications/notifications';

const NotificationsContainer = ({ notifications }) => {
    return (
        <div className="rounded-md p-2 bg-white flex flex-col gap-3 border border-gray-200 ">
            {notifications.map((notification) => (
                <Notifications
                    key={notification.id}
                    title={notification.title}
                    message={notification.message}
                    time={notification.time}
                />
            ))}
        </div>
    );
};

export default NotificationsContainer;
