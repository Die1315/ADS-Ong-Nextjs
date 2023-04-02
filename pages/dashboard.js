import { useState, useEffect, createContext } from "react";

import Navbar from "../components/Navbar/navBar";
import CardProfile from "../components/CardProfile/cardProfile";
import Newest from "../components/Newest/newest";
import PostsList from "../components/PostsList/postsList";
import Project from '../components/Project/project';
import { getGLobalPosts, getPostFollowing } from "../service/data-service";


const logo = require("../src/images/logo.svg")

export const DashboardContext = createContext();

function Dashboard() {

  const [mostrarPostsList, setMostrarPostsList] = useState(true);
  const [posts, setPosts] = useState([]);
  const [typePosts, setToggleGlobalPosts] = useState(true);

  const handlePosts = (event) => {
    console.log(event.target.name)
    if (event.target.name === 'global') {
      setToggleGlobalPosts(true);
    } else if (event.target.name === 'following') {
      setToggleGlobalPosts(false);
    }
  }

  useEffect(() => {
    console.log(typePosts)
    if (typePosts){
      getGLobalPosts().then((posts)=>{
        setPosts(posts);
      })      
    } else {
      getPostFollowing().then((posts) => {
        setPosts(posts);
      });
      
    }
  }, [typePosts]);


  return (
    
    <DashboardContext.Provider value={{ mostrarPostsList, setMostrarPostsList }}>

      <Navbar /><div className="container mx-auto px-2 md:px-0 py-5 flex flex-col md:flex-row gap-5">
      <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
        <CardProfile
          name="Nombre ONG"
          title="Categoría/Descripción"
          imageSrc={logo}
          onClick={() => setMostrarPostsList(!mostrarPostsList)} />
      </div>
      <div className="w-12/12 md:w-6/12 flex flex-col gap-5">
        {mostrarPostsList ? <div className="flex justify-around items-center gap-1">
          <button onClick={handlePosts} name="global" className={`py-2 font-bold text-sm underline w-3/6 rounded-md ${typePosts ? 'bg-white text-dark' : 'bg-dark text-primary'}`}>Global</button>
          <button onClick={handlePosts}  name="following"className={`py-2 font-bold text-sm underline w-3/6 rounded-md ${typePosts ? 'bg-white text-dark' : 'bg-dark text-primary'}`}>ONGs que sigo</button>
        </div> : <></>}

        {mostrarPostsList ? <PostsList posts={posts}/> : <Project />}


      </div>
      <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
         <Newest /></div>
    </div>
    </DashboardContext.Provider >

  );
}

export default Dashboard;
