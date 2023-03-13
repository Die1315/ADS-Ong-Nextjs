import Navbar from "../components/Navbar/navBar";
const logo = require("../src/images/logo.svg");
import { useContext, useEffect, useState } from "react";
import { getCurrentOng } from "../service/data-service";

function Profile() {
  const [currentOng, setDataOng] = useState([]);

  useEffect(() => {
    getCurrentOng().then((ong) => {
      console.log(ong)
      setDataOng(ong);
    });
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5 flex gap-5">
        <div className="w-9/12 flex flex-col gap-5 bg-white">
          <h1>PERFIL</h1>
          <p>Nombre: {currentOng.name}</p>
          <p>Email: {currentOng.email}</p>
          <p>CIF: {currentOng.CIF}</p>
          {currentOng.webPage  && <p>Pagina Web: {currentOng.webPage}</p>}
          {currentOng.inatagram  && <p>Instagram: {currentOng.instagram}</p>}
          {currentOng.facebook  && <p>Facebook: {currentOng.facebook}</p>}
          <p>Descripción: {currentOng.description}</p>
        </div>
        <div className="w-3/12 bg-white">
          <p>hola</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
