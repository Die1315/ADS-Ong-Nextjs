import { useState } from 'react';

const listData = [{ "id": 1, "name": "Elemento 1" }, { "id": 2, "name": "Elemento 2" }, { "id": 3, "name": "Elemento 3" }]

function Resources() {
    const [isListVisible, setIsListVisible] = useState(false);

    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    return (
        <div className="bg-white">
            <button onClick={toggleListVisibility} className="mb-2 w-full bg-primary hover:bg-secondary text-dark text-center rounded-md px-6 py-2 text-xs font-medium">
                Recursos
            </button>
            {isListVisible && (
                <ul>
                    {listData.map(item => (
                        <li key={item.id} className="py-2">{item.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Resources;
