
import Navbar from "../components/Navbar/navBar";

const logo = require("../src/images/logo.svg")

function Mensajes() {

    return (
        <div>
            <Navbar />
            <div className="container mx-auto py-5 flex gap-5">
                <div className="w-9/12 flex flex-col gap-5 bg-white">
                    <p>hola</p>
                </div>
                <div className="w-3/12 bg-white">
                    <p>hola</p>
                </div>
            </div>
        </div>
    );
}

export default Mensajes;
