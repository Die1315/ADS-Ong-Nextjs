import { useState, useEffect, createContext } from "react";

import Navbar from "../components/Navbar/navBar";
import CardProfile from "../components/CardProfile/cardProfile";
import Newest from "../components/Newest/newest";
import PostsList from "../components/PostsList/postsList";
import Project from '../components/Project/project';
import { getPostFollowing } from "../service/data-service";

const logo = require("../src/images/logo.svg")

export const DashboardContext = createContext();

function Dashboard() {

  const [mostrarPostsList, setMostrarPostsList] = useState(true);
  const [posts, setPosts] = useState([]);

  const handlePosts = (event) => {
    if (event.target.name === 'global') {
      setMostrarPostsList(true);
    } else if (event.target.name === 'following') {
      setMostrarPostsList(false);
    }
  }

  useEffect(() => {
    getPostFollowing().then((posts) => {
      setPosts(posts);
    });
  }, []);


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
            <button onClick={handlePosts} className={`py-2 font-bold text-sm underline w-3/6 rounded-md ${mostrarPostsList ? 'bg-white text-dark' : 'bg-dark text-primary'}`}>Global</button>
            <button onClick={handlePosts} className={`py-2 font-bold text-sm underline w-3/6 rounded-md ${mostrarPostsList ? 'bg-white text-dark' : 'bg-dark text-primary'}`}>ONGs que sigo</button>
          </div> : <></>}

          {mostrarPostsList ? <PostsList /> : <Project />}

        </div>
        <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
          <Newest />
        </div>
      </div>
    </DashboardContext.Provider >
  );
}

export default Dashboard;
