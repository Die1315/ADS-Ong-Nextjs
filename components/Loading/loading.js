import {JellyTriangle } from 'ldrs/react'

const Loading = () => (
    <div className="flex justify-center items-center h-screen">
        <JellyTriangle
            size={60}
            speed={1.75}
            color="#5CE1E6"
        />
    </div>
);

export default Loading;
