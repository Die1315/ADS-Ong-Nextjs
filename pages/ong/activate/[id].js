import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Loading from "../../../components/Loading/loading";
import Link from 'next/link';

export default function Activate() {
    const router = useRouter()
    const { id } = router.query

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
            ) : (
                <div className='w-full flex flex-col justify-center items-stretch'>
                    <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
                        <h1 className=' w-full text-center text-6xl font-semibold uppercase'>¡Usuario Activado!</h1>
                        <p className='text-center'>Ahora puedes iniciar sesión<br />
                            <Link href={`/login`} className='text-primary text-xl uppercase font-black underline'>Aquí</Link>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}