import Image from "next/image";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCurrentOng, getPostsOwner } from "../../../service/data-service";
import { faEnvelope, faCircleInfo, faIdBadge, faGlobe, faFacebook, faInstagram } from "@fortawesome/free-solid-svg-icons";
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
        <div className="w-full">
            <div className="w-full h-48 flex flex-col justify-center items-center relative">
                <Image
                    src='https://randomuser.me/api/portraits/men/17.jpg'
                    alt="profile picture"
                    fill={true}
                    layout="fill"
                    object-fit="cover"
                    className="rounded-tr-md rounded-tl-md" />
            </div>
            <div className="w-full flex flex-col gap-3 p-5">


                <h1 className="text-center font-bold text-2xl px-6">{currentOng.name}</h1>
                <div className="flex justify-center items-center">

                    <Link href="#">
                        <FontAwesomeIcon
                            icon={faGlobe}
                            style={{ fontSize: 15 }} />
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon
                            icon={faFacebook}
                            style={{ fontSize: 15 }} />
                    </Link>
                    <Link href="#">
                        <FontAwesomeIcon
                            icon={faInstagram}
                            style={{ fontSize: 15 }} />
                    </Link>
                </div>
                <div className="w-full flex justify-start items-center gap-3">
                    <FontAwesomeIcon
                        icon={faEnvelope}
                        style={{ fontSize: 15 }}
                        className="w-1/12"
                    />
                    {currentOng.email}
                </div>
                <div className="w-full flex justify-start items-center gap-3">
                    <FontAwesomeIcon
                        icon={faIdBadge}
                        style={{ fontSize: 15 }}
                        className="w-1/12"
                    />
                    {currentOng.CIF}
                </div>
                <div className="w-full flex justify-start items-center gap-3">
                    <FontAwesomeIcon
                        icon={faCircleInfo}
                        style={{ fontSize: 15 }}
                        className="w-1/12"
                    />
                    {currentOng.description}
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent;
