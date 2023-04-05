import { useState } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';

function CommentsBox(props) {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState(props.comments);

    // Función para agregar un nuevo comentario
    const handleAddComment = () => {
        if (newComment !== '') {
            setComments([...comments, newComment]);
            setNewComment('');
        }
    };

    // Función para actualizar el estado del nuevo comentario
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <div className="w-full h-full flex flex-col justify-between">
            <div>
                <h2 className="text-lg font-semibold mb-4">Comentarios ({comments.length})</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-300 py-2 mb-2 flex gap-3">
                        <Image
                            src=""
                            alt="Post Image"
                            width={50}
                            height={50}
                            className='rounded-full'
                        />
                        <div className='flex flex-col gap-1'>
                            <p>{comment}</p>
                            <p className='text-xs'>01/01/2023</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <textarea
                    className="w-full border border-gray-300 p-4 rounded text-sm"
                    placeholder="Escribe tu comentario aquí"
                    value={newComment}
                    onChange={handleCommentChange}
                />
                <button className="btn" onClick={handleAddComment}>Agregar comentario</button>
            </div>
        </div>
    );
}

CommentsBox.propTypes = {
    comments: PropTypes.arrayOf(PropTypes.string),
};

CommentsBox.defaultProps = {
    comments: [],
};

export default CommentsBox;
