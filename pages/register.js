import RegisterForm from "../components/RegisterForm/registerForm";
import Link from "next/link";
import Image from "next/image";

const logo = require("../src/images/logo.svg");

function addOng() {

  return (
    <div className="h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2 py-5 md:py-0 bg-register-hero bg-cover bg-center md:bg-white">
      <div className="static md:relative py-10 overflow-auto bg-white w-11/12 md:w-3/6 flex mx-auto flex-col justify-start items-stretch rounded-md md:rounded-none scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200">
        <div className="w-full flex justify-center">
          <Link href="/login"><Image src={logo} alt="logo Help Go" width="200" /></Link>
        </div>
        <p className="w-5/6 md:w-4/6 my-5 text-center mx-auto mb-12">
          Registra tu ONG y ponte en contacto con la ayuda
        </p>
        <div className="w-12/12 md:w-8/12 mx-auto flex flex-col gap-4">
          <RegisterForm />
          <Link href="/login" className="btn text-center">Iniciar sesión</Link>
        </div>
      </div>
      <div className="bg-register-hero bg-cover bg-no-repeat bg-center relative w-full md:w-3/6 flex justify-center items-center bg-accent"></div>
    </div>
  );
}

export default addOng;
