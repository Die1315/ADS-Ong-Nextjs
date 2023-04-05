function ListItem(props) {
  return (
    <tr className="border-b hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-300">
      <td className="px-6 py-4">{props.name}</td>
      <td className="px-6 py-4">{props.description}</td>
      <td className="px-6 py-4">{props.active ? "✔️" : "✖️"}</td>
    </tr>
  );
}

export default ListItem;
