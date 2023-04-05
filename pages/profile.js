import Navbar from "../components/Navbar/navbar";
import ProfileComponent from "../components/ProfileComponent/profileComponent";

function Profile() {

  return (
    <div>
      <Navbar createPost={false} />
      <ProfileComponent/>
    </div>
  );
}

export default Profile;
