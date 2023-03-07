import { useEffect, useState } from "react";
import { getOngList } from "../../service/data-service";
import ListItem from "./ListItem";

function OngList() {
  const [ongList, setOngList] = useState([]);

  const fetchOngList = async () => {
    const response = await getOngList();
    setOngList(response);
  };

  useEffect(() => {
    fetchOngList();
  }, []);

  return (
    <div>
      <ul>
        {!ongList
          ? "Cargando..."
          : ongList.map((ong, index) => <ListItem key={index} text={ong.name} />)}
      </ul>
    </div>
  );
}

export default OngList;
