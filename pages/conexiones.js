
import Navbar from "../components/Navbar/navBar";
import ContactCard from "../components/CardConexion/cardConexion";
import SearchBar from "../components/SearchBar/searchBar";

const trendingContacts = [
    {
        nombre: "Fernando Pérez",
        puesto: "Desarrollador Frontend",
        foto: "https://randomuser.me/api/portraits/men/57.jpg",
    },
    {
        nombre: "María González",
        puesto: "Diseñadora UI/UX",
        foto: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
        nombre: "Carolina Mendez",
        puesto: "Gerente de Ventas",
        foto: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        nombre: "Pedro Rodríguez",
        puesto: "Gerente de Ventas",
        foto: "https://randomuser.me/api/portraits/men/8.jpg",
    },
];


const logo = require("../src/images/logo.svg")

function Conexiones() {

    return (
        <div>
            <Navbar />
            <div className="container mx-auto flex flex-col-reverse md:flex-row gap-5 px-2 md:px-0 py-5">
                <div className="w-12/12 md:w-9/12 flex flex-col gap-5">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {trendingContacts.map((contact) => (
                            <ContactCard
                                key={contact.nombre}
                                nombre={contact.nombre}
                                puesto={contact.puesto}
                                foto={contact.foto}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-12/12 md:w-3/12">
                    <SearchBar/>
                </div>
            </div>
        </div>
    );
}

export default Conexiones;
