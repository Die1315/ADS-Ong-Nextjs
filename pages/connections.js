
import Navbar from "../components/Navbar/navBar";
import ContactCard from "../components/CardConexion/cardConexion";
import SearchBar from "../components/SearchBar/searchBar";
import { useState, useEffect, use } from "react";
import { getConnections } from "../service/data-service";

const logo = require("../src/images/logo.svg")

function Conexiones() {
    const [trendingConnections, setConnections] = useState([]);
    const [search, setSearch] = useState("")
    useEffect(()=>{
        getConnections().then((ongs)=>{
             setConnections(ongs)
        })
    }, [])
    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5 flex flex-col-reverse md:flex-row gap-5 p-5">
                <div className="w-12/12 md:w-9/12 flex flex-col gap-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trendingConnections.filter((ong) => ong.name.includes(search)).map((ong, i) => (
                            <ContactCard ong={ong}         
                            />
                        ))}
                    </div>
                </div>
                <div className="w-12/12 md:w-3/12">
                    <SearchBar search={search} onSearch={setSearch}/>
                </div>
            </div>
        </div>
    );
}

export default Conexiones;
