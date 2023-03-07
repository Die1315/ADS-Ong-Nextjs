import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router"
import Navbar from "../components/Navbar/navBar";
import CardProfile from "../components/CardProfile/cardProfile";
import CardTags from "../components/CardTags/cardTags";
import CardContacts from "../components/CardContacts/cardContacts";
import PostsList from "../components/PostsList/postsList";

const logo = require("../src/images/logo.svg")

function Dashboard() {
  const [user, setUser] = useState({
    email: "",
    username: "",
  });
  const router = useRouter()
  const getProfile = () => {
    axios
      .get("/api/profile")
      .then((response) => setUser(response.data))
      .catch((err) => console.log(err.toJSON()));
  };
  const logout = () => {
    axios.post("/api/auth/logout").then((res) => {
      router.push("/login")
      // console.log(res)
    });
  };


  const tags = ['Caridad', 'Servicios', 'Participación', 'Empoderamiento'];
  const categories = ['Comunitarias', 'Locales', 'Nacionales', 'Internacionales'];


  const posts = [
    {
      id: 1,
      title: 'ONG event post',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      image: 'https://res.cloudinary.com/de9uql5fm/image/upload/v1677757846/samples/cloudinary-group.jpg',
      startDate: new Date(2022, 1, 1),
      endDate: new Date(2022, 1, 31),
      userName: "ONG1 Name",
      userProfilePic: "https://randomuser.me/api/portraits/men/89.jpg"
    },
    {
      id: 2,
      title: 'Second ONG event post',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      image: 'https://res.cloudinary.com/de9uql5fm/image/upload/v1677757846/samples/landscapes/nature-mountains.jpg',
      startDate: new Date(2022, 2, 1),
      endDate: new Date(2022, 2, 31),
      userName: "ONG2 Name",
      userProfilePic: "https://randomuser.me/api/portraits/men/87.jpg"
    },
  ];

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
