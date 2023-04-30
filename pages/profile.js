import { useState, useEffect} from "react";

import Loading from "../components/Loading/loading";
import Navbar from "../components/Navbar/navbar";
import ProfileComponent from "../components/ProfileComponent/profileComponent";

function Profile() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar createPost={false} />
          <ProfileComponent isOwner={true} />
        </div>

      )}
    </>
  );
}

export default Profile;
