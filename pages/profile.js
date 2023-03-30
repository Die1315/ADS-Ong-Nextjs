import Navbar from "../components/Navbar/navBar";
const logo = require("../src/images/logo.svg");
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { getCurrentOng, getPostsOwner } from "../service/data-service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faCircleInfo, faIdBadge, faGlobe, faFacebook, faInstagram } from "@fortawesome/free-solid-svg-icons";
import Following from "../components/Following/following";
import Link from "next/link";
import PostsList from "../components/PostsList/postsList";

function Profile() {
  const [currentOng, setDataOng] = useState([]);
  const [posts, setPosts] = useState([])

  useEffect(() => {
    getCurrentOng(true).then((ong) => {
      setDataOng(ong);
    });
    getPostsOwner().then((posts) =>{
      console.log(posts)
      setPosts(posts);
    })
    
  }, []);

  const webPage = getCurrentOng.webPage
  const facebook = getCurrentOng.facebook
  const instagram = getCurrentOng.instagram

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-2 md:px-0 py-5 flex flex-col md:flex-row gap-5">

        <div className="w-12/12 md:w-3/12 flex flex-col justify-center items-center gap-5 bg-white rounded-md p-5">
          <div className="w-12/12 flex flex-col justify-center items-center">
            <Image
              src='https://randomuser.me/api/portraits/men/17.jpg'
              alt="profile picture"
              width="200"
              height="200"
              className="rounded-full" />
            <h1 className="-translate-y-6 font-bold text-2xl bg-primary border-2 border-primary rounded-full px-6">{currentOng.name}</h1>
            <div className="flex">
              <Link href="#">
                <FontAwesomeIcon
                  icon={faGlobe}
                  style={{ fontSize: 15 }} />
              </Link>
              <Link href="#">
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: 15 }} />
              </Link>
              <Link href="#">
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ fontSize: 15 }} />
              </Link>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <div className="w-full flex justify-start items-center gap-3">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ fontSize: 15 }}
                className="w-1/12"
              />
              {currentOng.email}
            </div>
            <div className="w-full flex justify-start items-center gap-3">
              <FontAwesomeIcon
                icon={faIdBadge}
                style={{ fontSize: 15 }}
                className="w-1/12"
              />
              {currentOng.CIF}
            </div>
            <div className="w-full flex justify-start items-center gap-3">
              <FontAwesomeIcon
                icon={faCircleInfo}
                style={{ fontSize: 15 }}
                className="w-1/12"
              />
              {currentOng.description}
            </div>
          </div>

        </div>
        <div className="w-12/12 md:w-6/12">
        <PostsList posts={posts} />
        </div>
        <div className="w-12/12 md:w-3/12">

          <Following />
        </div>
      </div>
    </div>
  );
}

export default Profile;
