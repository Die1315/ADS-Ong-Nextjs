import Image from 'next/image';
import FollowButton from '../FollowButton/followButton'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getConnections } from '../../service/data-service';


const Contact = ({ ong }) => {
  
  return (
    <div className="flex justify-between items-center py-2">
      <div className='flex'>
        <div className="relative w-20 h-12 mr-3">
          <Image
            src={ong.image}
            layout="fill"
            objectFit="cover"
            alt={`Profile picture of ${ong.name}`}
            className="rounded-full"
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

const Trends = () => {
  const [trendingConnections, setConnections] = useState([]);
  const [search, setSearch] = useState("")
  useEffect(()=>{
      getConnections().then((ongs)=>{
           setConnections(ongs)
      })
  }, [])

  return (
    <div className="w-full bg-white rounded-md shadow-sm p-4 flex flex-col gap-5">
      <h3 className="font-medium text-gray-900 mb-4">ONGs más populares:</h3>
      {trendingConnections.sort((x,y)=> x.updatedAt - y.updatedAt).map((ong) => (
        <Contact key={ong.name} ong={ong} />
      ))}
    </div>
  );
};

export default Trends;
