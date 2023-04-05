import Image from "next/image";
import { useEffect, useState } from "react";
import { getCurrentOng, getPostsOwner } from "../../../service/data-service";
import Link from "next/link";

function ProfileComponent() {

    const [currentOng, setDataOng] = useState([]);
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getCurrentOng(true).then((ong) => {
            setDataOng(ong);
        });
        getPostsOwner().then((posts) => {
            console.log(posts)
            setPosts(posts);
        })

    }, []);

    return (
        <div className="relative flex flex-col w-full">

            <div className="w-full h-48 flex flex-col justify-center items-center relative">
                <Image
                    src="https://res.cloudinary.com/de9uql5fm/image/upload/v1680642284/cover_dark_jwwhgs.jpg"
                    alt="cover picture"
                    fill={true}
                    layout="fill"
                    object-fit="cover"
                    className="rounded-t-md object-cover" />
            </div>
            <div className="flex justify-between items-end p-4 pt-0">
                <div className="w-3/12 flex items-end gap-5 px-0 ml-5 -translate-y-4">
                    <Image
                        src={currentOng.image}
                        alt="profile picture"
                        width="150"
                        height="150"
                        className="rounded-full w-24 h-24 object-cover border-4 border-white" />
                    <div className="flex flex-col">
                        <h1 className="text-center font-bold text-4xl">{currentOng.name}</h1>
                        <p><Link href="#" className="text-primary text-sm font-bold">8</Link> conexiones</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;
