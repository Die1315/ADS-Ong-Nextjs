import axios from "../service/client";


export function login(credentials) {
  return axios
    .post("/api/login", {
      credentials,
    })
    .then((response) => response.data)
    .catch((err) => err.message);
}
export function logout() {
  axios.post("/api/logout").then((res) => {
    router.push("/login")
   })
   .catch((err)=>err.message);
    
};
