import { useState, useEffect } from "react";

import Loading from "../components/Loading/loading";
import Navbar from "../components/Navbar/navbar";
import CardConexion from "../components/CardConexion/cardConexion";
import SearchBar from "../components/SearchBar/searchBar";
import Connections from "../components/Connections/connections";
import Footer from "../components/Footer/footer"

import { getConnections } from "../service/data-service";
const logo = require("../src/images/logo.svg")

function Conexiones() {

    const [isLoading, setIsLoading] = useState(true);


    const [trendingConnections, setConnections] = useState([]);
    const [search, setSearch] = useState("")
    useEffect(() => {
        getConnections().then((ongs) => {
            setConnections(ongs)
        });

        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [])

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div>
                    <Navbar />
                    <div className="container mx-auto py-5 flex flex-col md:flex-row gap-5 p-5">
                        <div className="w-12/12 md:w-9/12 flex flex-col gap-5">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {trendingConnections.filter((ong) => ong.name.includes(search)).map((ong, i) => (
                                    <CardConexion ong={ong} key={i} />
                                ))}
                            </div>
                        </div>
                        <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
                            <SearchBar search={search} onSearch={setSearch} />
                            <Connections filter="trending"/>
                            <Footer />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Conexiones;
