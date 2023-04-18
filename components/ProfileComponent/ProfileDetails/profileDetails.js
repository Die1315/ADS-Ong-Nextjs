import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLink,
    faCircleInfo,
    faEnvelope,
    faIdBadge
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import { getCurrentOng } from "../../../service/data-service";

function ProfileDetails() {
    const [currentOng, setDataOng] = useState([]);

    useEffect(() => {
        getCurrentOng(true).then((ong) => {
            setDataOng(ong);
        });

    }, []);

      return (
        <div className="w-full flex flex-col gap-5">
            <h2 className="font-bold text-xl">Detalles de contacto</h2>
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

                <Link href="#" className="bg-dark flex justify-center items-center text-light hover:text-primary rounded-full w-10 h-10">
                    <FontAwesomeIcon
                        icon={faLink}
                        style={{ fontSize: 15 }} />
                </Link>
                <Link href="#" className="bg-dark flex justify-center items-center text-light hover:text-primary rounded-full w-10 h-10">
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        style={{ fontSize: 15 }} />
                </Link>
                <Link href="#" className="bg-dark flex justify-center items-center text-light hover:text-primary rounded-full w-10 h-10">
                    <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ fontSize: 16 }} />
                </Link>
            </div>
        </div>
    );
}

export default ProfileDetails;
