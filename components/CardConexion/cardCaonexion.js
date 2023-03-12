import React from "react";

const CardConexion = ({ nombre, puesto, foto }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={foto} alt={nombre} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{nombre}</div>
        <p className="text-gray-700 text-base">{puesto}</p>
      </div>
    </div>
  );
};

export default CardConexion;
