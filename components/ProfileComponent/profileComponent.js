import { useEffect, useState } from "react";
import { getPostsOwner } from "../../service/data-service";
import Following from "../ConnectionFollowing/connectionfollowing";
import PostsList from "../PostsList/postsList";
import CardProfile from "./CardProfile/cardProfile";
import ProfileDetails from "./ProfileDetails/profileDetails";
import Footer from "../Footer/footer";
import MenuProfile from "../MenuProfile/menuProfile";
import ConnectionsList from "../ConnectionsList/connectionsList";
import Project from "../Project/project";

function ProfileComponent() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getPostsOwner().then((posts) => {
      console.log(posts)
      setPosts(posts);
    })

  }, []);

  const [activeItem, setActiveItem] = useState("Proyectos");

  let componentToRender;
  if (activeItem === 'posts') {
    componentToRender = <PostsList />;
  } else if (activeItem === 'contacts') {
    componentToRender = <ConnectionsList />;
  } else if (activeItem === 'info') {
    componentToRender = <Footer />;
  }

  return (
    <div className="py-5">
      <div className="container mx-auto bg-white rounded-md">
        <CardProfile />
        <MenuProfile setActiveItem={setActiveItem} />
      </div>
      <div className="container mx-auto px-2 md:px-0 py-5 flex flex-col items-start md:flex-row gap-5">

        <div className="h-content w-12/12 md:w-3/12 p-4 border border-gray-200 rounded-md bg-light">
          <ProfileDetails />
        </div>
        <div className="w-12/12 md:w-6/12">
          {activeItem === "Proyectos" && <PostsList posts={posts} />}
          {activeItem === "Conexiones" && <ConnectionsList />}
          {activeItem === "Información" && <p>Información del perfil</p>}
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
