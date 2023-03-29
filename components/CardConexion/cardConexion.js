import React from "react";
import FollowButton from "../FollowButton/followButton"

const CardConexion = ({ nombre, puesto, foto }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-sm">
      <img className="w-full" src={foto} alt={nombre} />
      <div className="bg-white flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl mb-2">{nombre}</h2>
          <p className="text-gray-700 text-base">{puesto}</p>
        </div>
        <FollowButton />
      </div>
    </div>
  );
};

export default CardConexion;
