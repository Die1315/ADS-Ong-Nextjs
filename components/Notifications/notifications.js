import Link from "next/link";
import { useState } from "react";

function Notifications({ title, message, time }) {
    return (
        <div className="bg-white p-4 border border-gray-200 rounded-md">
            <div className="flex items-center">
                <img src="https://randomuser.me/api/portraits/women/3.jpg" className="h-6 w-6 mr-2 rounded-full" alt="Notification Icon" />
                <Link href={`/dashboard`}><h2 className="text-sm font-medium text-gray-800">{title}</h2></Link>
            </div>
            <Link href={`/dashboard`}><div className="text-sm text-gray-600 mt-1">{message}</div></Link>
            <Link href={`/dashboard`}><div className="text-xs text-gray-400 mt-2">{time}</div></Link>
        </div>
    );
};

export default Notifications