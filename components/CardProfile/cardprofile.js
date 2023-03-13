import Image from 'next/image';
import Link from 'next/link';

const CardProfile = ({ name, title, imageSrc }) => {

    return (
        <div className="bg-white shadow-md rounded-md overflow-hiddenm flex flex-col items-stretch  sticky top-5">
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
            <div className="p-6 flex justify-between">
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
            <Link href="/createProject" className='w-full bg-primary hover:bg-secondary text-white hover:text-dark text-center p-4'>Crear Proyecto</Link>
        </div>
    );
};

export default CardProfile;
