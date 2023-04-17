import { useEffect, useState, useContext } from 'react';
import Image from 'next/image';

import { DashboardContext } from '../../pages/dashboard';
import { getCurrentOng, getPostsOwner } from "../../service/data-service";
import { formatDate } from '../../utils/dateUtils';

const CardProfile = ({ name, title, imageSrc }) => {

    const { mostrarPostsList, setMostrarPostsList } = useContext(DashboardContext);
    const [currentOng, setDataOng] = useState([]);

    useEffect(() => {
        getCurrentOng(true).then((ong) => {
            setDataOng(ong);
        });
    }, [title]);
    console.log(typeof new Date(currentOng.updatedAt),(currentOng?.updatedAt))
    return (
        <div className="bg-white shadow-sm rounded-md overflow-hiddenm flex flex-col items-stretch sticky top-5">
            <div className="relative ">
                <Image
                    src={currentOng.image}
                    alt={`Profile picture of ${currentOng.name}`}
                    width={320}
                    height={150}
                    className="w-full h-32 object-cover rounded-t-md"
                />
            </div>
            <div className="px-6 py-4 text-center ">
                <h3 className="text-3xl font-bold text-gray-900">{currentOng.name}</h3>
                <p className="text-sm text-gray-600">{title}</p>
            </div>
            <hr />
            <div className="p-6 hidden md:flex  justify-between">
                <div className="w-4/6 flex flex-col gap-2">
                    <p className="text-sm">No. de Proyectos:</p>
                    <p className="text-sm">Conexiones:</p>
                    <p className="text-sm">Última actualización:</p>
                </div>
                <div className="w-2/6 flex flex-col gap-2 text-right text-primary font-semibold">
                    <p className="text-sm">{currentOng.posts?.length}</p>
                    <p className="text-sm">{currentOng.following?.length}</p>
                    <p className="text-sm">{currentOng?.updatedAt}</p>
                </div>
            </div>
            <button onClick={() => setMostrarPostsList(!mostrarPostsList)} className={mostrarPostsList ? 'w-full bg-dark text-light hover:text-secondary text-center font-bold p-4 rounded-b-md' : 'w-full bg-secondary text-center font-bold p-4 rounded-b-md'}>
                {mostrarPostsList ? 'Crear Proyecto' : 'Ver Proyectos'}
            </button>

        </div>
    );
};

export default CardProfile;
