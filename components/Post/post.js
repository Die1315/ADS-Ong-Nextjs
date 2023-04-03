import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '../../utils/dateUtils';
import LikeButton from '../LikeButton/likeButton'
import CommentButton from '../CommentButton/commentButton'
import Resources from '../Resources/resources';

const Post = ({ key,title, description, image, startDate, endDate, userProfilePic, userName, lat, likes }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);
    const shortDescription = description.slice(0, 120);
    console.log(key,title, description, image, startDate, endDate, userProfilePic, userName)
    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            <div className="relative">
                <div>
                    <Link href="#" className="absolute top-0 right-0 bg-white hover:bg-dark rounded-bl-md px-4 py-2 text-primary hover:font-bold transition duration-500">Ver mapa</Link>
                </div>
                <Image className="w-full object-cover min-h-80 max-h-80" src={image} alt="Post" width={800} height={600} />
                <div className="absolute bottom-0 left-0 bg-gray-900 bg-opacity-50 w-full py-2">
                    <div className="relative flex items-center w-full px-4">
                        <div className="w-10 h-10 rounded-full mr-2 overflow-hidden">
                            <Image className="object-cover" src={userProfilePic} alt="User Profile" width={40} height={40} />
                        </div>
                        <div className='w-full flex justify-between items-center'>
                            <div className="w-12/12">
                                <p className="text-white font-bold text-lg">{userName}</p>
                                <p className="text-gray-300 text-sm">De <span className="text-primary">{`${formatDate(startDate.toString())}`}</span> a <span className="text-primary">{endDate && `${formatDate(endDate.toString())}`}</span></p>
                            </div>
                            <div className="flex gap-1">
                                <CommentButton />
                                <LikeButton likes={likes} id={key}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-xl font-medium text-gray-900">{title}</h3>
                <p className="text-gray-700 text-base mb-2">{showFullDescription ? description : shortDescription}{description.length < 120 || showFullDescription ? "" : "..."}</p>
                {description.length > 120 && (
                    <button className=" bg-secondary text-dark rounded-md px-6 py-2 text-xs font-medium" onClick={toggleDescription}>
                        {showFullDescription ? 'Leer menos' : 'Leer más'}
                    </button>
                )}
                <Resources />
            </div>
        </div>
    );
};


export default Post;
