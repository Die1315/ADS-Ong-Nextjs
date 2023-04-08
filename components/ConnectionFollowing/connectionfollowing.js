import Image from 'next/image';
import { useEffect, useState } from 'react';

import FollowButton from '../FollowButton/followButton'

import { getConnections } from '../../service/data-service';


const Contact = ({ ong }) => {
  
  return (
    <div className="flex justify-between items-center py-2">
      <div className='flex'>
        <div className="relative w-20 h-12 mr-3">
          <Image
            src={ong.image}
            alt={`Profile picture of ${ong.name}`}
            width={200}
            height={200}
            className="object-cover w-12 h-12 rounded-full"
          />
        </div>
        <div className='w-full'>
          <h4 className="text-sm font-medium text-gray-900">{ong.name}</h4>
          <p className="text-sm text-gray-500">{}</p>
        </div>
      </div>
      <FollowButton ong={ong} />
    </div>
  );
};

const Newest = () => {
  const [trendingConnections, setConnections] = useState([]);
  useEffect(()=>{
      getConnections().then((ongs)=>{
           setConnections(ongs)
      })
  }, [])

  return (
    <div className="w-full bg-white border border-gray-200 rounded-md shadow-sm p-4 flex flex-col gap-5">
      <h3 className="font-medium text-gray-900 mb-4">ONGs con más interacción:</h3>
      {trendingConnections.sort((x,y)=>  y.updatedAt.localeCompare(x.updatedAt)).map((ong) => {
       return (
        <Contact key={ong.name} ong={ong} />
      )})}
    </div>
  );
};

export default Newest;
