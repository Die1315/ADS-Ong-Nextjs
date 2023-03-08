function ListItem(params) {
  return (
    <li key={params.key}>
      <div>
        <div className="flex-initial">
          <h2>{params.name}</h2>
          <div className="float-right">{params.active ? "✔️" : "✖️"}</div>
        </div>
        <p>{params.description}</p>
      </div>
    </li>
  );
}

export default ListItem;
