import React from "react";
import FollowButton from "../FollowButton/followButton"

const CardConexion = ({ong}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-sm">
      <img className="w-full" src={ong.image} alt={ong.name} />
      <div className="bg-white flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-2">{ong.name}</h2>
          <p className="text-gray-700 text-base">{ong.description}</p>
        </div>
        <FollowButton ong={ong}/>
      </div>
    </div>
  );
};

export default CardConexion;
