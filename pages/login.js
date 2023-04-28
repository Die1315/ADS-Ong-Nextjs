import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import Loading from "../components/Loading/loading";
import Footer from "../components/loginFooter/loginFooter";
const logo = require("../src/images/logo.svg")
import { login } from "../service/data-service"
import RecoveryForm from "../components/recoveryComponent/recoveryComponent";
import { set } from "mongoose";

function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);

    const [credentials, setCredentials] = useState({ email: '', password: '' })
    const [error, setError] = useState();
    const [stateForm, setForm] = useState(true);
    const router = useRouter()
    const handleChange = (event) => {
        setCredentials({
            ...credentials,
            [event.target.name]: event.target.value
        })
    }

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [stateForm]);

    const handleSubmit = (event) => {
        event.preventDefault();
        login(credentials).then((res) => {
            if (res.code === "ERR_BAD_REQUEST") {
                setError(res.response.data.message || res.response.data.error);
            } else {
                router.push("/dashboard")
            }

        })

    }
    const toggleForm = () => {
        setForm(!stateForm)
    }
    return (
        <>
            {isLoading ? (
                <Loading />
            ) :
                <div className="relative h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2  bg-login-hero bg-cover bg-center md:bg-white">
                    <div className="bg-login-hero bg-cover bg-no-repeat bg-center lg:bg-top-lg xl:bg-top-xl relative w-full md:w-3/6 flex justify-center items-center bg-accent">
                    </div>{stateForm ? (
                        <div className="static md:relative h-6/6 py-8 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
                            <Image
                                src={logo}
                                alt="logo Help Go"
                                width="200"
                            />
                            <p className="w-5/6 md:w-4/6 lg:w-3/6 my-5 text-center mx-auto">La conexión que viene en forma de ayuda</p>

                            <form onSubmit={handleSubmit} className="w-5/6 md:w-4/6 lg:w-3/6 flex flex-col justify-center items-stretch gap-5">
                                <input name="email" type="email" required placeholder="email"
                                    onChange={handleChange} />
                                <input name="password" type="password" required placeholder="password"
                                    onChange={handleChange} />
                                <button onClick={toggleForm} className="text-sm text-primary w-full text-center md:text-right">¿Has olvidado la constraseña?</button>
                                <button type="submit" className="btn">Login</button>
                                <Link href="/register" className="w-full flex justify-center items-center bg-dark hover:bg-primary font-Ubuntu text-white font-bold uppercase rounded-md py-2 mx-auto">Registrar ONG</Link>
                            </form>

                            {error && <div className="alert alert-danger">{error}</div>}
                            <Footer />
                        </div>
                    ) : <RecoveryForm toggleForm={toggleForm} />}
                </div>}
        </>
    );
}

export default LoginPage;
