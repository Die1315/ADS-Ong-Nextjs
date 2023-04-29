import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faLink,
    faEnvelope,
    faIdBadge,
    faPeopleGroup
} from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";


function ProfileDetails({ ong }) {

    const webpage = ong.webPage
    const facebook = ong.facebook
    const instagram = ong.instagram

    return (
        <div className="w-full flex flex-col gap-5">
            <h2 className="font-bold text-xl">Detalles de contacto</h2>
            <div className="flex justify-start items-center gap-5">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    style={{ fontSize: 15 }}
                    className="w-6 text-left"
                />
                <Link href={`mailto:${ong.email}`}>
                    {ong.email}
                </Link>
            </div>
            <div className="flex justify-start items-center gap-5">
                <FontAwesomeIcon
                    icon={faIdBadge}
                    style={{ fontSize: 15 }}
                    className="w-6 text-left"
                />
                {ong.CIF}
            </div>
            <div className="flex justify-start items-center gap-5">
                <FontAwesomeIcon
                    icon={faPeopleGroup}
                    style={{ fontSize: 15 }}
                    className="w-6 text-left"
                />
                {ong.category}
            </div>
            <div className="flex justify-start items-center gap-5">

                {webpage && <Link href={`${webpage}`} className="bg-dark flex justify-center items-center text-light hover:text-primary rounded-full w-10 h-10">
                    <FontAwesomeIcon
                        icon={faLink}
                        style={{ fontSize: 15 }} />
                </Link>}
                {facebook && <Link href={`${facebook}`} className="bg-dark flex justify-center items-center text-light hover:text-primary rounded-full w-10 h-10">
                    <FontAwesomeIcon
                        icon={faFacebookF}
                        style={{ fontSize: 15 }} />
                </Link>}
                {instagram && <Link href={`${instagram}`} className="bg-dark flex justify-center items-center text-light hover:text-primary rounded-full w-10 h-10">
                    <FontAwesomeIcon
                        icon={faInstagram}
                        style={{ fontSize: 16 }} />
                </Link>}
            </div>
        </div>
    );
}

export default ProfileDetails;
