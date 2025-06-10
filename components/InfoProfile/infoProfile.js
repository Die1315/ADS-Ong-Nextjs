
import { useEffect, useState } from "react";

import ProfileDetails from "../ProfileComponent/ProfileDetails/profileDetails";

import { getCurrentOng } from "../../service/data-service";

function InfoProfile({ong, isOwner}) {
    
    return (
        <div className="w-full bg-white rounded-md flex flex-col gap-5 p-4 border border-gray-200 overflow-hidden">
            <h2 className="font-bold text-xl">Información de la ONG:</h2>
            <p>
                {ong.description}
            </p>

            <ProfileDetails isOwner={isOwner} ong={ong} />
        </div>
    )
}

export default InfoProfile