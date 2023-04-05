import { useEffect, useState } from "react";
import { getCurrentOng, getPostsOwner } from "../../../service/data-service";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGlobe,
    faCircleInfo,
    faEnvelope,
    faIdBadge
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";

function ProfileDetails() {
    const [currentOng, setDataOng] = useState([]);

    useEffect(() => {
        getCurrentOng(true).then((ong) => {
            setDataOng(ong);
        });

    }, []);

    const webPage = getCurrentOng.webPage
    const facebook = getCurrentOng.facebook
    const instagram = getCurrentOng.instagram

    return (
        <div className="flex flex-col gap-5">
            <h2 className="font-Ubuntu font-bold text-xl">Detalles</h2>
            <div className="flex justify-start items-center gap-5">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ fontSize: 15 }}
                />
                {currentOng.email}
            </div>
            <div className="flex justify-start items-center gap-5">
                <FontAwesomeIcon
                    icon={faIdBadge}
                    style={{ fontSize: 15 }}
                />
                {currentOng.CIF}
            </div>
            <div className="flex justify-start items-center gap-5">
                <FontAwesomeIcon
                    icon={faCircleInfo}
                    style={{ fontSize: 15 }}
                />
                {currentOng.description}
            </div>
            <div className="flex justify-start items-center gap-5">

                <Link href="#">
                    <FontAwesomeIcon
                        icon={faGlobe}
                        style={{ fontSize: 15 }}
                        className="text-dark hover:text-primary" />
                </Link>
                <Link href="#">
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        style={{ fontSize: 15 }}
                        className="text-dark hover:text-primary" />
                </Link>
                <Link href="#">
                    <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ fontSize: 16 }}
                        className="text-dark hover:text-primary" />
                </Link>
            </div>
        </div>
    );
}

export default ProfileDetails;
