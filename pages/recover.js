
import { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';

import Loading from "../components/Loading/loading";

const logo = require("../src/images/logo.svg")

export default function Recover() {
    //const router = useRouter()
    //const { id } = router.query

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (<div className="relative h-screen flex flex-col md:flex-row justify-center items-stretch columns-1 md:columns-2  bg-login-hero bg-cover bg-center md:bg-white">
                <div className="bg-recover bg-cover bg-no-repeat bg-center lg:bg-top-lg xl:bg-top-xl relative w-full md:w-3/6 flex justify-center items-center bg-accent">
                </div>
                <div className="static md:relative h-6/6 py-8 bg-white md:h-full w-11/12 md:w-3/6 flex mx-auto flex-col justify-center items-center rounded-md md:rounded-none">
                    <Link href={`/login`}>
                        <Image
                            src={logo}
                            alt='logo'
                            width={`150`}
                            height={100} />
                    </Link>
                    <div className="w-11/12 md:w-6/12 flex flex-col gap-3">
                        <h1 className='text-center text-4xl font-bold'>Recupera tu contraseña</h1>
                        <p className='text-center mb-3'>Ingresa tu correo electrónico:</p>
                        <form className='w-full flex flex-col justify-center gap-3'>
                            <input
                                type="email"
                                placeholder="correo electrónico"
                                className='w-full'
                            ></input>
                            <button type='submit' className='w-48 mx-auto bg-primary rounded-md px-6 py-2 font-bold text-white hover:bg-dark'>Enviar</button>
                        </form>
                    </div>
                </div>
            </div>
            )}
        </>
    );
}