import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import Footer from "/components/LoginFooter/loginFooter";
const logo = require("../src/images/logo.svg")
import {login} from "../service/data-service"

function LoginPage() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const router = useRouter()
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        login(credentials).then((response) => {
            router.push("/dashboard")
            // console.log(response)
        })
            .catch((err) => console.log(err.toJSON()));
        
    }
    return (
        <div className="relative h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2  bg-login-hero bg-cover bg-center md:bg-white">
            <Link href="/registrar-ong" className="absolute top-5 right-5 flex justify-center items-center h-24 w-24 rounded-full bg-secondary hover:bg-primary text-dark hover:text-light text-center text-sm z-50">Registrar<br/>ONG</Link>
            <div className="bg-login-hero bg-cover bg-no-repeat bg-center lg:bg-top-lg xl:bg-top-xl relative w-full md:w-3/6 flex justify-center items-center bg-accent">
            </div>
            <div className="static md:relative h-6/6 py-8 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
                <Image
                    src={logo}
                    alt="logo Help Go"
                    width="200"
                />
                <p className="w-5/6 md:w-4/6 lg:w-3/6 my-5 text-center mx-auto">La conexión que viene en forma de ayuda</p>
                <form onSubmit={handleSubmit} className="w-5/6 md:w-4/6 lg:w-3/6 flex flex-col justify-center items-stretch gap-5">
                    <input name="email" type="email" placeholder="email"
                        onChange={handleChange} />
                    <input name="password" type="password" placeholder="password"
                        onChange={handleChange} />
                    <Link href="#" className="text-sm text-primary w-full text-center md:text-right">¿Has olvidad la constraseña?</Link>
                    <button type="submit" className="btn">Login</button>
                </form>
                <Footer />
            </div>
        </div>
    )
}

export default LoginPage;
