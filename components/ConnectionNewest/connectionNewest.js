import Image from 'next/image';
import FollowButton from '../FollowButton/followButton'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConnections } from '../../service/data-service';
import { formatDate } from '../../utils/dateUtils';


const Contact = ({ ong }) => {

  return (
    <div className="flex justify-between items-center py-2">
      <div className='flex'>
        <div className="relative w-20 h-12 mr-3">
          <Link href={`/ong/${ong.id}`}>
            <Image
              src={ong.image}
              alt={`Profile picture of ${ong.name}`}
              width={200}
              height={200}
              className="object-cover w-12 h-12 rounded-full"
            />
          </Link>
        </div>
        <div className='w-full flex flex-col gap-1'>
          <Link href={`/ong/${ong.id}`}><h4 className="text-sm font-medium text-gray-900">{ong.name}</h4></Link>
          <p className="text-xs text-gray-500">Categoría</p>
        </div>
      </div>
      <FollowButton ong={ong} />
    </div>
  );
};

const Newest = () => {
  const [trendingConnections, setConnections] = useState([]);
  useEffect(() => {
    getConnections().then((ongs) => {
      setConnections(ongs)
    })
  }, [])

  return (
    <div className="w-full bg-white rounded-md shadow-sm p-4 hidden md:flex flex-col gap-5">
      <h3 className="font-medium text-gray-900 mb-4">ONGs con proyectos recientes:</h3>
      {trendingConnections.sort((x, y) => y.updatedAt.localeCompare(x.updatedAt)).map((ong) => {
        return (
          <Contact key={ong.name} ong={ong} />
        )
      })}
      <Link href='/connections' className='w-full text-center text-primary text-sm font-semibold'>Ver más...</Link>
    </div>
  );
};

export default Newest;
