import axios from "axios";
import { useState } from "react";
import {useRouter} from "next/router"

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
        console.log(res)});
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>Logout</button>
      <button onClick={getProfile}>get profile</button>
    </div>
  );
}

export default Dashboard;
