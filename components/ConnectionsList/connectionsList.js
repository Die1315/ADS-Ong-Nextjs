
import ContactCard from "../CardConexion/cardConexion";
import { useState, useEffect } from "react";
import { getConnections, getFollowing } from "../../service/data-service";


function ConnectionsList({isOwner, currentOng, search}) {
    
    const [trendingConnections, setConnections] = useState([]);
    const [typeContacts, setTypeContacts] = useState(null);
 
    useEffect(() => {
        getFollowing(isOwner? null : currentOng.id).then((ongs) => {
            setConnections(ongs)
        })
    }, [])

     return (<div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trendingConnections.filter((ong) => ong.name.includes(search) || ong.category.includes(search) )
            .map((ong, i) => (
                
                <ContactCard ong={ong} key={i} currentOng={currentOng}/>
            ))}
        </div>
    </div>
    )
}

export default ConnectionsList