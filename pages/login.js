import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { login } from "../service/data-service";

function LoginPage() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();
  const handleChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    login(credentials)
      .then((response) => {
        console.log(response)
        router.push("/dashboard")
    })
      .catch((err) => {
        console.log(err)
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          type="email"
          placxeholder="email"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placxeholder="password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
