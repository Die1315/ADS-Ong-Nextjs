import ListItem from "./ListItem";

function OngList({data}) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div>
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Nombre
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Descripción
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Activo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!data
                    ? "Cargando..."
                    : data.map((ong, index) => (
                        <ListItem
                          key={index}
                          name={ong.name}
                          description={ong.description}
                          active={ong.active}
                        />
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OngList;
