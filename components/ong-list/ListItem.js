function ListItem(params){
  return <li key={params.key}><h2>{params.text}</h2></li>
}

export default ListItem;