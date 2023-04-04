import { useContext } from 'react';
import { DashboardContext } from '../../pages/dashboard';
import Image from 'next/image';

const CardProfile = ({ name, title, imageSrc }) => {

    const { mostrarPostsList, setMostrarPostsList } = useContext(DashboardContext);

    return (
        <div className="bg-white shadow-sm rounded-md overflow-hiddenm flex flex-col items-stretch  sticky top-5">
            <div className="relative h-auto p-2">
                <Image
                    src={imageSrc}
                    width="200"
                    alt={`Profile picture of ${name}`}
                    className="mx-auto mt-5"
                />
            </div>
            <div className="px-6 py-4 text-center ">
                <h3 className="text-lg font-medium text-gray-900">{name}</h3>
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
                    <p className="text-sm">2</p>
                    <p className="text-sm">115</p>
                    <p className="text-sm">15/02/23</p>
                </div>
            </div>
            <button onClick={() => setMostrarPostsList(!mostrarPostsList)} className={mostrarPostsList ? 'w-full bg-dark text-secondary text-center font-bold p-4 rounded-b-md' : 'w-full bg-secondary text-center font-bold p-4 rounded-b-md'}>
                {mostrarPostsList ? 'Crear Proyecto' : 'Ver Proyectos'}
            </button>

        </div>
    );
};

export default CardProfile;
