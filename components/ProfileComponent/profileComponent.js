import { useEffect, useState } from "react";
import { getCurrentOng, getPostsOwner } from "../../service/data-service";
import Follow from "../Follow/follow";
import PostsList from "../PostsList/postsList";
import ProfileCard from "./ProfileCard/profileCard";

function ProfileComponent() {
  const [currentOng, setDataOng] = useState([]);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getCurrentOng(true).then((ong) => {
      setDataOng(ong);
    });
    getPostsOwner().then((posts) => {
      console.log(posts)
      setPosts(posts);
    })

  }, []);

  const webPage = getCurrentOng.webPage
  const facebook = getCurrentOng.facebook
  const instagram = getCurrentOng.instagram

  return (
    <div>
      <div className="container mx-auto px-2 md:px-0 py-5 flex flex-col md:flex-row gap-5">

        <div className="h-min w-12/12 md:w-3/12 flex flex-col justify-center items-center gap-5 bg-white rounded-md p-0">
          <ProfileCard />
        </div>
        <div className="w-12/12 md:w-6/12">
          <PostsList posts={posts} />
        </div>
        <div className="w-12/12 md:w-3/12">

          <Follow />
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
