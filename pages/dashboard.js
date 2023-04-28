import { useState, useEffect, createContext } from "react";

import Loading from "../components/Loading/loading";
import Navbar from "../components/Navbar/navbar";
import Footer from "../components/Footer/footer";
import CardDashboard from "../components/CardDashboard/cardDashboard";
import Connections from "../components/Connections/connections";
import PostsList from "../components/PostsList/postsList";
import Project from '../components/Project/project';
import { getGLobalPosts, getPostFollowing } from "../service/data-service";
import SearchBar from "../components/SearchBar/searchBar";
import CardTags from "../components/Tags/tags";

const logo = require("../src/images/logo.svg")

const categories = ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'];

export const DashboardContext = createContext();

function Dashboard() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  const [mostrarPostsList, setMostrarPostsList] = useState(true);
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [typePosts, setToggleGlobalPosts] = useState(true);

  const handlePosts = (event) => {
    //console.log(event.target.name)
    if (event.target.name === 'global') {
      setToggleGlobalPosts(true);
    } else if (event.target.name === 'following') {
      setToggleGlobalPosts(false);
    }
  }

  useEffect(() => {
    if (typePosts) {
      getGLobalPosts().then((posts) => {
        setPosts(posts);
      })
    } else {
      getPostFollowing().then((posts) => {
        setPosts(posts);
      });

    }
  }, [typePosts]);


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <DashboardContext.Provider value={{ mostrarPostsList, setMostrarPostsList }}>

          <Navbar createPost={true} posts={posts} setPosts={setPosts} />
          <div className="container mx-auto px-2 md:px-0 py-5 flex flex-col md:flex-row gap-5">
            <div className="w-12/12 md:w-3/12 relative flex flex-col gap-5">
              <CardDashboard
                name="Nombre ONG"
                imageSrc={logo}
                onClick={() => setMostrarPostsList(!mostrarPostsList)} />
              <CardTags title="Categorías:" categories={categories} />
            </div>
            <div className="w-12/12 md:w-6/12 flex flex-col gap-5">
              {mostrarPostsList ? <div className="flex justify-around items-center gap-1">
                <button onClick={handlePosts} name="global" className={`py-2 font-bold text-sm w-3/6 rounded-md ${!typePosts ? 'bg-white text-gray-400 hover:text-primary' : ' bg-gray-200 text-dark'}`}>Global</button>
                <button onClick={handlePosts} name="following" className={`py-2 font-bold text-sm w-3/6 rounded-md ${typePosts ? 'bg-white text-gray-400 hover:text-primary' : 'bg-gray-200 text-dark'}`}>ONGs que sigo</button>
              </div> : <></>}

              {mostrarPostsList ? <SearchBar search={search} onSearch={setSearch} displayOnResponsive={true} /> : ""}
              {mostrarPostsList ? <PostsList posts={posts} search={search} /> : <Project posts={posts} setPosts={setPosts} />}


            </div>
            <div className="w-12/12 md:w-3/12 flex flex-col gap-5">
              <SearchBar search={search} onSearch={setSearch} displayOnResponsive={false} />
              <Connections filter="latest"/>
              <Footer />
            </div>
          </div>
        </DashboardContext.Provider >
      )}
    </>
  );
}

export default Dashboard;
