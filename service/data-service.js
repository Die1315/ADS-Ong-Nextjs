//import axios from "../service/client";
import { faListNumeric } from "@fortawesome/free-solid-svg-icons";
import axios from "axios"
import cookie from "js-cookie";




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

export function getCurrentOng(owner=false, ongToSearch){
  if(owner===true){
    return axios.get(`/api/ongs/profile`
  ).then((res) =>{ 
    return res.data})
    .catch((err)=>console.log(err.message));
  } else {
    return axios.get(`/api/ongs/${ongToSearch}/profile`
    ).then((res) =>{ 
      return res.data})
      .catch((err)=>console.log(err.message));
  }
}

export function registerProject(data) {
  let dataRegister = {
    ...data
  }
  // console.log(dataRegister);
  return axios.post("/api/posts", {dataRegister})
              .then((response) => response.data)
              .catch((err) => { return err });
}

export function getPostsOwner(){
  return axios.get('/api/postsbyong/')
              .then((response) => response.data)
              .catch((err)=>err)
}

export function getConnections(){
  return axios.get('/api/ongs/newConnections')
              .then((response) => response.data)
              .catch((err)=>err)
}

export function getGLobalPosts(){
  return axios.get('/api/postsGlobal')
              .then((response) => response.data)
              .catch((err)=>err)
}

export function followUnfollow(id){
  return axios.put(`/api/ongs/${id}/follow`)
              .then((response) => response.data)
              .catch((err)=>err)
}

export function uploadCloudinary(data) {
  return axios.post(
    "https://api.cloudinary.com/v1_1/disqrp2r2/image/upload",
    data
  );
}

export function getGLobalPosts(){
  return axios.get('/api/postsGlobal')
              .then((response) => response.data)
              .catch((err)=>err)
}

export function getPostFollowing(){
  return axios.get('/api/posts/followers')
              .then((response) => response.data)
              .catch((err)=>err)
}