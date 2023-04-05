import { useEffect, useState } from "react";
import { getCurrentOng, getPostsOwner } from "../../service/data-service";
import Following from "../Following/following";
import PostsList from "../PostsList/postsList";
import CardProfile from "./CardProfile/cardProfile";
import Footer from "../Footer/footer";

function ProfileComponent() {
  const [currentOng, setDataOng] = useState([]);
  const [posts, setPosts] = useState([])
  
  const [modalIsOpen, setModalIsOpen] = useState(false);


  if (modalIsOpen){
    edit.style.zIndex = 0
  }

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
          <CardProfile/>
        </div>
        <div className="w-12/12 md:w-6/12">
          <PostsList posts={posts}/>
        </div>
        <div className="w-12/12 md:w-3/12">

          <Following />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
