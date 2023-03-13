//import axios from "../service/client";
import { faListNumeric } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import cookie from "js-cookie";


const currentOng =   cookie.get("ONG");

export function login(credentials) {
  return axios
    .post("/api/login", {
      credentials,
    })
    .then((response) => response.data
    
    )
    .catch((err) => {
      console.error(err)
    return err});
}
  
export function register(dataRegister){
  return axios
  .post("/api/ongs", {
    dataRegister,
  })
  .then((response) => response.data)
  .catch((err) => {
    //console.error(err)
    return err});
}

export function getCurrentOng(owner=false){
  if(owner===true){
    return axios.get(`/api/ongs/profile`
  ).then((res) =>{ 
    return res.data})
    .catch((err)=>console.log(err.message));
  } else {
    return axios.get(`/api/ongs/${currentOng}/profile`
    ).then((res) =>{ 
      return res.data})
      .catch((err)=>console.log(err.message));
  }
}

export function registerProject(data) {
  let dataRegister = {
    ...data, owner: currentOng
  }
  // console.log(dataRegister);
  return axios.post("/api/posts", {dataRegister})
              .then((response) => response.data)
              .catch((err) => { return err });
}

export function  getPostFollowing(){
  return axios.get('/api/posts/followers')
              .then((response) => response.data)
              .catch((err)=>err)

}