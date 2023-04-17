const CardTags = ({ title, categories }) => {
  return (
    <div className="hidden md:block bg-white rounded-md shadow-md overflow-hidden">
      <div className="px-6 py-4">
        <h3 className="text-md font-medium text-gray-900">{title}</h3>
        <div className="flex flex-wrap my-2">
          {categories.map((category) => (
            <span
              key={category}
              className="px-2 py-1 mr-2 mb-2 bg-gray-400 text-light hover:bg-primary hover:text-dark rounded-full text-xs font-bold cursor-pointer"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardTags;
