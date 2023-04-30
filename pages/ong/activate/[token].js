import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Loading from "../../../components/Loading/loading";
import Link from 'next/link';
import { activateOng } from '../../../service/data-service';

export default function Activate() {
    const router = useRouter()
    const { token } = router.query
     const [isLoading, setIsLoading] = useState(true);
    const [isActivated, setIsActivated] = useState(false)
    useEffect(() => {
        if (router.isReady) {
        activateOng(token).then((ong)=>{
            console.log(ong)
                setIsActivated(ong.active)
                setIsLoading(false);
        })
    }
        const timeoutId = setTimeout(() => {
            
            

        }, 1500);

        return () => clearTimeout(timeoutId);
    }, [router.isReady]);

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <div className='w-full flex flex-col justify-center items-stretch'>
                    <div className='w-full h-screen flex flex-col justify-center items-center gap-5'>
                        <h1 className=' w-full text-center text-6xl font-semibold uppercase'>{isActivated ? "¡Usuario Activado!": "Error No Activado"}</h1>
                        <p className='text-center'>Ahora puedes iniciar sesión<br />
                            <Link href={`/login`} className='text-primary text-xl uppercase font-black underline'>Aquí</Link>
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}