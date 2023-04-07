import React from "react";
import Image from "next/image";

import FollowButton from "../FollowButton/followButton"

const CardConexion = ({ ong }) => {
  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-sm">
      <Image 
      src={ong.image} 
      alt={ong.name}
      width={320}
      height={150}
      className="w-full h-24 object-cover"  />
      <div className="bg-white flex justify-between items-center p-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-2">{ong.name}</h2>
          <p className="text-gray-700 text-base">{ong.description}</p>
        </div>
        <FollowButton ong={ong} />
      </div>
    </div>
  );
};

export default CardConexion;
