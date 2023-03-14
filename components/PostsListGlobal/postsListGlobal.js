import Post from '../Post/post';

const PostsList = ({ posts }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      {posts?.map((post) => (
        <Post
          key={post.id}
          title={post.title}
          description={post.description}
          image={post.image}
          startDate={post.startdate}
          endDate={post.enddate}
          userName={post.owner}
          userProfilePic={post.userProfilePic}
        />
      ))}
    </div>
  );
};

export default PostsList;
