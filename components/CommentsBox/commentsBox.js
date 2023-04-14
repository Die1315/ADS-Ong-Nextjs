import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
import { createComment, getComments } from '../../service/data-service';


function CommentsBox({postId}) {
    const [newComment, setNewComment] = useState('');
    const [comments, setComments] = useState([]);
    const [state, setChange] = useState(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();
    useEffect(()=>{
        getComments(postId).then((comments)=>{
            setComments(comments)
        })
    }, [state])
   
    // Función para agregar un nuevo comentario
    const handleAddComment = () => {
        
        if (newComment !== '') {
            createComment(postId,{"text": newComment})
            .then((res)=> {
                setChange(!state)
            })            
            setNewComment('')
        }
       
    };

    // Función para actualizar el estado del nuevo comentario
    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    return (
        <div className="w-full h-full flex flex-col">
            <div className='relative max-h-96 overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-secondary scrollbar-track-gray-200'>
                <h2 className="text-sm font-semibold">Comentarios ({comments.length})</h2>
                {comments.map((comment, index) => (
                    <div key={index} className="border-b border-gray-300 py-2 mb-2 flex gap-3">
                        <Image
                            src={comment.ong.image}
                            alt="Post Image"
                            width={200}
                            height={200}
                            className="object-cover w-10 h-10 rounded-full"
                        />
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm'>{comment.text}</p>
                            <p className='text-xs text-primary'>{formattedDate}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <textarea
                    name="text"
                    className="w-full border border-gray-300 p-4 rounded text-sm"
                    placeholder="Escribe tu comentario aquí"
                    value={newComment}
                    onChange={handleCommentChange}
                />
                <button onClick={handleAddComment} className="btn" >Agregar comentario</button>
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
