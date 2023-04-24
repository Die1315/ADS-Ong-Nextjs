import axios from "axios"



export function login(credentials) {
  return axios
    .post("/api/login", {
      credentials,
    })
    .then((response) => response.data)
    .catch((err) => {
      console.error(err);
      return err;
    });
}

export function register(dataRegister) {
  return axios
    .post("/api/ongs", {
      dataRegister,
    })
    .then((response) => response.data)
    .catch((err) => {
      //console.error(err)
      return err;
    });
}

export function getCurrentOng(owner = false, ongToSearch) {
  if (owner === true) {
    return axios
      .get(`/api/ongs/profile`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  } else {
    return axios
      .get(`/api/ongs/${ongToSearch}/profile`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => err);
  }
}
export function updateProfile(dataUpdated){
  return axios
    .put('/api/ongs/edit', dataUpdated)
    .then((response)=> response.data)
    .catch((err) => err)

}

export function registerProject(data) {
  let dataRegister = {
    ...data,
  };
  // console.log(dataRegister);
  return axios
    .post("/api/post", { dataRegister })
    .then((response) => response.data)
    .catch((err) => {
      return err;
    });
}
export function editPost(id,dataUpdate){
  //console.log(dataUpdate)
  return axios.put(`/api/post/${id}/edit`, dataUpdate)
              .then((response) => response.data)
              .catch((err) => err)
}

export function getPostsOwner(id) {
  if(id){
    return axios
    .get(`/api/posts/${id}/ong`)
    .then((response) => response.data)
    .catch((err) => err);
  } else {
  return axios
    .get("/api/posts/ong/")
    .then((response) => response.data)
    .catch((err) => err);
}}

export function getPost(id){
  return axios
    .get(`/api/post/${id}`)
    .then((response) => response.data)
    .catch((err) => err);
}

export function getConnections() {
  return axios
    .get("/api/ongs/newConnections")
    .then((response) => response.data)
    .catch((err) => err);
}
export function getGLobalPosts() {
  return axios
    .get("/api/posts/Global")
    .then((response) => response.data)
    .catch((err) => err);
}
export function getPostFollowing() {
  return axios
    .get("/api/posts/followers")
    .then((response) => response.data)
    .catch((err) => err);
}
export function followUnfollow(id) {
  return axios
    .put(`/api/ongs/${id}/follow`)
    .then((response) => response.data)
    .catch((err) => err);
}
//Comments
export function getComments(id) {
   return axios
    .get(`/api/post/${id}/comments`)
    .then((response) => response.data)
    .catch((err) => err);
}
export function createComment(id, dataComment) {
  return axios
    .post(`/api/comment/${id}/create`, {
      dataComment,
    })
    .then((response) => response.data)
    .catch((err) => err);
}
export function deleteComment(id) {
  return axios
    .delete(`/api/comment/${id}/delete`)
    .then((response) => response.data)
    .catch((err) => err);
}

// Cloudinary
export function uploadCloudinary(data) {
  return axios.post(
    "https://api.cloudinary.com/v1_1/disqrp2r2/image/upload",
    data
  ).catch((err)=>err)
};

export function toggleLike(id) {
  return axios
    .put(`/api/post/${id}/like`)
    .then((response) => response.data)
    .catch((err) => err);
}

// Contact Message
export function addMessage(from, to, message, image = "") {
  return axios.post('/api/addMessage', {from, to, message, image})
              .then((response) => response.data)
              .catch((err)=>err);
}

export function getMessages(from, to) {
  return axios.post('/api/getMessages', {from, to})
              .then((response) => response.data)
              .catch((err)=>err);
}

export function getFollowedUsers() {
  return axios
    .post("/api/getFollowedUsers")
    .then((response) => response)
    .catch((err) => err);
}
