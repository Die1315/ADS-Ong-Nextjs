//import axios from "../service/client";
import axios from "axios"
export function login(credentials) {
  return axios
    .post("/api/login", {
      credentials,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err)
    return err});
}
export function logout() {
  
  axios.post("/api/logout").then((res) => {
    router.push("/login")
    console.log(res)
   })
   .catch((err)=>console.log(err.message));
    
};

export function register(dataRegister){
  return axios
  .post("/api/ongs", {
    dataRegister,
  })
  .then((response) => response.data)
  .catch((err) => {
    console.error(err)
    return err});
}