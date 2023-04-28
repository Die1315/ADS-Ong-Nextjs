
import ContactCard from "../CardConexion/cardConexion";
import { useState, useEffect } from "react";
import { getConnections, getFollowing } from "../../service/data-service";

function ConnectionsList({isOwner, currentOng}) {

    const [trendingConnections, setConnections] = useState([]);
    const [search, setSearch] = useState("")
    const [typeContacts, setTypeContacts] = useState(true);

    useEffect(() => {
        getFollowing(isOwner? null : currentOng.id).then((ongs) => {
            setConnections(ongs)
        })
    }, [])

    const handleContacts = (event) => {
        //console.log(event.target.name)
        if (event.target.name === 'mutual') {
            setTypeContacts(true);
        } else if (event.target.name === 'discover') {
            setTypeContacts(false);
        }
    }


    return (<div className="flex flex-col gap-5">
        {!isOwner &&
            <div className="w-full flex justify-center items-center gap-5">
                <button onClick={handleContacts} name="mutual" className={`py-2 font-bold text-sm w-3/6 rounded-md ${!typeContacts ? 'bg-white text-gray-400 hover:text-primary' : ' bg-gray-200 text-dark'}`}>En común</button>
                <button onClick={handleContacts} name="discover" className={`py-2 font-bold text-sm w-3/6 rounded-md ${typeContacts ? 'bg-white text-gray-400 hover:text-primary' : 'bg-gray-200 text-dark'}`}>Descubrir</button>
            </div>
        }
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {trendingConnections.filter((ong) => ong.name.includes(search)).map((ong, i) => (

                <ContactCard ong={ong} key={i} currentOng={currentOng}/>
            ))}
        </div>
    </div>
    )
}

export default ConnectionsList