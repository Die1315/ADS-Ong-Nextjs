import { useContext } from 'react';
import { ongContext } from '../context/ongContext';

export default function UserInfo() {
  const [state]  = useContext(ongContext);
  
  return (
    <>
    <h1>PERFIL</h1>
      <p>Nombre: {state.name}</p>
      <p>Email: {state.email}</p>
      <p>CIF: {state.CIF}</p>
      {state.webPage !== undefined &&  <p>Pagina Web: {state.webPage}</p>}
      {state.inatagram !== undefined &&  <p>Instagram: {state.instagram}</p>}
      {state.facebook !== undefined &&  <p>Facebook: {state.facebook}</p>}
      <p>Descripción: {state.description}</p>
    </>
  );
}