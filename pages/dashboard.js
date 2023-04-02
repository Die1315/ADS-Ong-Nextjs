import { useState, useEffect, createContext } from "react";

import Navbar from "../components/Navbar/navBar";
import CardProfile from "../components/CardProfile/cardProfile";
import CardTags from "../components/CardTags/cardTags";
import Following from "../components/Following/following";
import PostsListGlobal from "../components/PostsListGlobal/postsListGlobal";
import PostsList from "../components/PostsList/postsList";
import Project from '../components/Project/project';
import Follow from "../components/Follow/follow";
import { getPostFollowing } from "../service/data-service";

const logo = require("../src/images/logo.svg")

export const DashboardContext = createContext();

function Dashboard() {

  const [mostrarPostsList, setMostrarPostsList] = useState(true);
  const [posts, setPosts] = useState([]);
  const [showGlobalPosts, setShowGlobalPosts] = useState(true);

  const handlePosts = (event) => {
    if (event.target.name === 'global') {
      setShowGlobalPosts(true);
    } else if (event.target.name === 'following') {
      setShowGlobalPosts(false);
    }
  }

  useEffect(() => {
    getPostFollowing().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const tags = ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'];
  const categories = ['Comunitarias', 'Locales', 'Nacionales', 'Internacionales'];

  return (
    <DashboardContext.Provider value={{ mostrarPostsList, setMostrarPostsList }}>
      <Navbar />
      <div className="container mx-auto px-2 md:px-0 py-5 flex flex-col md:flex-row gap-5">
        <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
          <CardProfile
            name="Nombre ONG"
            title="Categoría/Descripción"
            imageSrc={logo}
            onClick={() => setMostrarPostsList(!mostrarPostsList)}
          />
        </div>
        <div className="w-12/12 md:w-6/12 flex flex-col gap-5">
          {mostrarPostsList ? <div className="flex justify-around items-center gap-1">
            <button onClick={handlePosts} className={`py-2 font-bold text-sm underline w-3/6 rounded-md ${showGlobalPosts ? 'bg-white text-dark' : 'bg-dark text-primary'}`}>Global</button>
            <button onClick={handlePosts} className={`py-2 font-bold text-sm underline w-3/6 rounded-md ${showGlobalPosts ? 'bg-white text-dark' : 'bg-dark text-primary'}`}>ONGs que sigo</button>
          </div> : <></>}

          {mostrarPostsList ? showGlobalPosts ? <PostsListGlobal /> : <PostsListFollowing /> : <Project />}

        </div>
        <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
          <Following />
          <Follow />
        </div>
      </div>
    </DashboardContext.Provider >
  );
}

export default Dashboard;
