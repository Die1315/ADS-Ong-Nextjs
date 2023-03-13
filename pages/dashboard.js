import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Navbar from "../components/Navbar/navBar";
import CardProfile from "../components/CardProfile/cardProfile";
import CardTags from "../components/CardTags/cardTags";
import CardContacts from "../components/CardContacts/cardContacts";
import PostsList from "../components/PostsList/postsList";
import { getPostFollowing } from "../service/data-service";
const logo = require("../src/images/logo.svg")


function Dashboard() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPostFollowing().then((posts) => {
      setPosts(posts);
    });
  }, []);

  const router = useRouter()
  const logout = () => {

    axios.post("/api/logout").then((res) => {
        router.push("/login")
      });

  };


  const tags = ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'];
  const categories = ['Comunitarias', 'Locales', 'Nacionales', 'Internacionales'];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5 flex gap-5">
        <div className="w-3/12 flex flex-col gap-5">
          <CardProfile
            name="Nombre ONG"
            title="Categoría/Descripción"
            imageSrc={logo}
          />
          <CardTags title="Descubrir" tags={tags} categories={categories} />
        </div>
        <div className="w-6/12 flex flex-col gap-5">
          <PostsList posts={posts} />
        </div>
        <div className="w-3/12">
          <CardContacts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
