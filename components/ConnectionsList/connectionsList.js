
import ContactCard from "../CardConexion/cardConexion";
import { useState, useEffect } from "react";
import { getConnections } from "../../service/data-service";

function ConnectionsList() {

    const [trendingConnections, setConnections] = useState([]);
    const [search, setSearch] = useState("")

    useEffect(() => {
        getConnections().then((ongs) => {
            setConnections(ongs)
        })
    }, [])

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {trendingConnections.filter((ong) => ong.name.includes(search)).map((ong, i) => (
                <ContactCard ong={ong} />
            ))}
        </div>
    )
}

export default ConnectionsList