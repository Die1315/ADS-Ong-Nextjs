import { useState } from 'react';
import Post from '../Post/post';

const PostsList = ({ posts, search, isOwner, updatePost }) => {
    
    return (
        <div className="w-full flex flex-col gap-2">
            {posts?.filter((post) => post.title.includes(search) || post.owner.name.includes(search))
            .sort((x,y)=>  y.updatedAt.localeCompare(x.updatedAt))
            .map((post, i) => ( 
                    <Post
                        key={i}
                        isOwner={isOwner}
                        post={post}                        
                    />            
            ))}
        </div>
            );
};

export default PostsList;
