const CardTags = ({ title, tags, categories }) => {
    return (
      <div className="bg-white rounded-md shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="text-md font-medium text-gray-900">{title}</h3>
          <div className="flex flex-wrap my-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 mr-2 mb-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap my-2">
            {categories.map((category) => (
              <span
                key={category}
                className="px-2 py-1 mr-2 mb-2 bg-primary text-white rounded-full text-sm font-medium"
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
  