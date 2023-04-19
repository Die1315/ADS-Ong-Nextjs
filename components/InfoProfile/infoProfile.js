
import { useEffect, useState } from "react";

import ProfileDetails from "../ProfileComponent/ProfileDetails/profileDetails";

import { getCurrentOng } from "../../service/data-service";

function InfoProfile(props) {
    const [currentOng, setDataOng] = useState([]);

    useEffect(() => {
        if (!props.isOwner) {
            getCurrentOng(false, props.id).then((ong) => {
                setDataOng(ong);
            });
        } else {
            getCurrentOng(true).then((ong) => {
                setDataOng(ong);
            });
        }
    }, [props.id]);

    return (
        <div className="w-full bg-white rounded-md flex flex-col gap-5 p-4 border border-gray-200">
            <h2 className="font-bold text-xl">Información de la ONG:</h2>
            <p>
                {currentOng.description}
            </p>

            <ProfileDetails isOwner={props.isOwner} id={props.id} />
        </div>
    )
}

export default InfoProfile