import React from "react";
import Image from "next/image";
import Link from "next/link";

import FollowButton from "../FollowButton/followButton"

const CardConexion = ({ ong}) => {
  return (
    <div className="relative bg-white max-w-sm max-h-max flex flex-col justify-start rounded overflow-hidden shadow-sm">
      <Link href={`/ong/${ong.id}`}>
        <Image
          src={ong.image}
          alt={ong.name}
          width={320}
          height={150}
          className="w-full h-24 object-cover" />
      </Link>
      <div className="bg-white flex justify-between items-center p-2 md:p-4">
        <div className="flex flex-col">
          <Link href={`/ong/${ong.id}`}><h2 className="font-bold text-xl mb-2">{ong.name}</h2></Link>
          <p className="text-gray-700 text-base">{ong.description}</p>
        </div>
        <FollowButton ong={ong} />
      </div>
    </div>
  );
};

export default CardConexion;
