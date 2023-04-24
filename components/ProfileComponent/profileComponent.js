import { useEffect, useState } from "react";
import { getPostsOwner, getCurrentOng } from "../../service/data-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import CardProfile from "./CardProfile/cardProfile";
import MenuProfile from "../MenuProfile/menuProfile";
import ProfileDetails from "./ProfileDetails/profileDetails";
import PostsList from "../PostsList/postsList";
import InfoProfile from "../InfoProfile/infoProfile"
import ConnectionsList from "../ConnectionsList/connectionsList";
import EditCover from "../EditCover/editCover";
import EditProfile from "../EditProfile/editProfile";
import ProjectForm from "../ProjectForm/projectForm";
import Following from "../ConnectionFollowing/connectionfollowing";
import Footer from "../Footer/footer";

function ProfileComponent({ isOwner, idOng }) {
  const [posts, setPosts] = useState([])
  //const [coverPiture, setCoverPicture] = useState("")

  useEffect(() => {
    getPostsOwner(null || idOng).then((posts) => {
      //console.log(posts)
      setPosts(posts);
    })

  }, [idOng]);

  const [activeItem, setActiveItem] = useState("Proyectos");

  return (
    <div className="py-5 px-5 md:px-0">
      <div className="container mx-auto bg-white rounded-md">
        <CardProfile setActiveItem={setActiveItem} isOwner={isOwner} id={idOng} coverPicture={coverPiture} setCoverPicture={setCoverPicture}/>
        <MenuProfile setActiveItem={setActiveItem} isOwner={isOwner} />
      </div>
      <div className="container mx-auto px-0 py-5 flex flex-col items-start md:flex-row gap-5">

        <div className={activeItem === "Información" || activeItem === "Conexiones" ? "hidden" : "h-content order-2 md:order-1 p-4 border border-gray-200 rounded-md bg-light w-full md:w-3/12"}>
          <ProfileDetails isOwner={isOwner} id={idOng} />
        </div>
        <div className={activeItem === "Información" || activeItem === "Conexiones" ? "w-full order-1 md:order-2 md:w-9/12" : "w-full order-1 md:order-2 md:w-6/12"}>
          {activeItem === "Crear" &&
            <div className="relative w-full bg-white rounded-md flex flex-col gap-5 items-stretch px-4 py-5 border border-gray-200">

              <button onClick={() => setActiveItem("Proyectos")} className="absolute text-dark top-6 right-5">
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ fontSize: 20 }} />
              </button>
              <h2 className="text-xl font-bold">Crear proyecto</h2>
              <ProjectForm />
              <button onClick={() => setActiveItem("Proyectos")} className="btn-alt bg-dark">
                Cancelar
              </button>
            </div>
          }
          {activeItem === "Proyectos" && <PostsList posts={posts} search={""} isOwner={isOwner} />}
          {activeItem === "Conexiones" && <ConnectionsList isOwner={isOwner} />}
          {activeItem === "Información" && <InfoProfile isOwner={isOwner} id={idOng} />}
          {isOwner ? activeItem === "Perfil" && <EditProfile /> : null}
          {isOwner ? activeItem === "Portada" && <EditCover /> : null }
        </div>
        <div className="w-12/12 order-3 md:order-3 md:w-3/12">

          {isOwner && <Following />}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
