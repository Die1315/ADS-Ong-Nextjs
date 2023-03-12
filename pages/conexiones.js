
import Navbar from "../components/Navbar/navBar";
import ContactCard from "../components/CardConexion/cardCaonexion";
import CardContacts from "../components/CardContacts/cardContacts";

const trendingContacts = [
    {
        nombre: "Juan Pérez",
        puesto: "Desarrollador Frontend",
        foto: "https://randomuser.me/api/portraits/men/57.jpg",
    },
    {
        nombre: "María González",
        puesto: "Diseñadora UI/UX",
        foto: "https://randomuser.me/api/portraits/women/28.jpg",
    },
    {
        nombre: "Pedro Rodríguez",
        puesto: "Gerente de Ventas",
        foto: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
        nombre: "Pedro Rodríguez",
        puesto: "Gerente de Ventas",
        foto: "https://randomuser.me/api/portraits/women/5.jpg",
    },
];


const logo = require("../src/images/logo.svg")

function Conexiones() {

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5 flex gap-5">
                <div className="w-9/12 flex flex-col gap-5">
                    <div className="grid grid-cols-3 gap-4">
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
                <div className="w-3/12">
                    <CardContacts/>
                </div>
            </div>
        </div>
    );
}

export default Conexiones;
