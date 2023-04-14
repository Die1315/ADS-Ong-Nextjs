
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

import { getCurrentOng } from "../../service/data-service";

function InfoProfile() {
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
        <div className="w-full bg-white rounded-md flex flex-col gap-5 p-4 border border-gray-200">
            <h2 className="font-bold text-xl">Información de la ONG:</h2>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus tristique arcu sem. In eleifend tempor posuere. Donec a efficitur purus, ut porttitor leo. Phasellus vel erat pharetra, ultrices est eu, dapibus tortor. Donec volutpat non ipsum nec efficitur. Phasellus lorem lectus, tincidunt interdum elementum vel, faucibus vitae erat. Etiam et eros dui. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas iaculis nisi risus, eget tempus ipsum laoreet vel.
            </p>
            <p>
                Suspendisse eu cursus arcu, vel vestibulum ligula. Fusce fermentum faucibus nunc, in pellentesque sapien aliquet sit amet. Praesent euismod fringilla orci sit amet consequat. Nam ut venenatis nulla, sit amet sollicitudin ipsum. Vestibulum est odio, imperdiet in tincidunt vel, cursus sed lacus. Curabitur eu pulvinar leo, eget lacinia purus. Integer faucibus lacus sed auctor hendrerit.
            </p>
            <p>
                Phasellus semper ac diam ac blandit. Duis consequat justo quam. Proin tempor ornare gravida. Vivamus in sem eu leo hendrerit malesuada. Nam fermentum consequat enim sed congue. Morbi quis odio lorem. Nulla sollicitudin neque nec ante convallis tincidunt. Phasellus in placerat velit, vel fermentum sapien. Curabitur accumsan finibus ligula, vitae tempor est dictum id. Donec dignissim vehicula cursus.
            </p>
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
    )
}

export default InfoProfile