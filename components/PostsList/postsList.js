import Post from '../Post/post';

const PostsList = ({ posts, search }) => {
    return (
        <div className="w-full flex flex-col gap-2">
            {posts?.filter((post) => post.title.includes(search) || post.owner.name.includes(search))
            .sort((x,y)=>  y.updatedAt.localeCompare(x.updatedAt))
            .map((post, i) => (
                <Post
                    key={i}
                    title={post.title}
                    description={post.description}
                    image={post.image}
                    startDate={post.startdate}
                    endDate={post.enddate}
                    userName={post.owner.name}
                    userProfilePic={post.owner.image}
                    likes={post.likes}
                    resources={post.resources}
                    id={post.id}
                />
            ))}
        </div>
    );
};

export default PostsList;
