import axios from "axios"



export async function login(credentials) {
  try {
    const response = await axios
      .post("/api/login", {
        credentials,
      });
    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
}
export async function recoverRequest(data){
  try {
    //console.log(data)
    const response = await axios
    .post('/api/ongs/recoverRequest',data)
    //console.log(response)
    return response.data;
  } catch (error) {
    return error;
  }
}
export async function passwordUpdate(data){
  try {
    const response = await axios
    .put('/api/ongs/recover',data)
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function register(dataRegister) {
  try {
    const response = await axios
      .post("/api/ongs", {
        dataRegister,
      });
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getCurrentOng(owner = false, ongToSearch) {
  if (owner === true) {
    try {
      const res = await axios
        .get(`/api/ongs/profile`);
      return res.data;
    } catch (err) {
      return err;
    }
  } else {
    try {
      const res_1 = await axios
        .get(`/api/ongs/${ongToSearch}/profile`);
      return res_1.data;
    } catch (err_1) {
      return err_1;
    }
  }
}
export async function activateOng(token){
  try {
    const response = await axios
      .put(`/api/ongs/activate`, { token: token });
    return response.data;
  } catch (err) {
    return err;
  }  
}
export async function updateProfile(dataUpdated){
  try {
    const response = await axios
      .put('/api/ongs/edit', dataUpdated);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function registerProject(data) {
  let dataRegister = {
    ...data,
  };
  // console.log(dataRegister);
  try {
    const response = await axios
      .post("/api/post", { dataRegister });
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function editPost(id,dataUpdate){
  //console.log(dataUpdate)
  try {
    const response = await axios.put(`/api/post/${id}/edit`, dataUpdate);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getPostsOwner(id) {
  if(id){
    try {
      const response = await axios
        .get(`/api/posts/${id}/ong`);
      return response.data;
    } catch (err) {
      return err;
    }
  } else {
  try {
      const response_1 = await axios
        .get("/api/posts/ong/");
      return response_1.data;
    } catch (err_1) {
      return err_1;
    }
}}

export async function getPost(id){
  try {
    const response = await axios
      .get(`/api/post/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function deletePost(id){
  try {
    const response = await axios
      .delete(`/api/post/${id}`);
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function getConnections(size,trend) {
  //console.log(trend)
  if(size){
    let url= `/api/ongs/newConnections?size=${size}` 
   if(trend) url = url.concat(`&trend=${trend}`)
   //console.log(url)
    try {
      const response = await axios
        .get(url);
      return response.data;
    } catch (err) {
      return err;
    }
  } else {
  try {
      const response_1 = await axios
        .get("/api/ongs/newConnections");
      return response_1.data;
    } catch (err_1) {
      return err_1;
    }
  }
}
export async function getFollowing(id){
  if(id){
    try {
      const response = await axios
        .get(`/api/ongs/${id}/following`);
      return response.data;
    } catch (err) {
      return err;
    }
    } else {
    try {
      const response_1 = await axios
        .get(`/api/ongs/following`);
      return response_1.data;
    } catch (err_1) {
      return err_1;
    }
  }
}
export async function getGLobalPosts() {
  try {
    const response = await axios
      .get("/api/posts/Global");
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function getPostFollowing() {
  try {
    const response = await axios
      .get("/api/posts/following");
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function followUnfollow(id) {
  try {
    const response = await axios
      .put(`/api/ongs/${id}/follow`);
    return response.data;
  } catch (err) {
    return err;
  }
}
//Comments
export async function getComments(id) {
   try {
    const response = await axios
      .get(`/api/post/${id}/comments`);
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function createComment(id, dataComment) {
  try {
    const response = await axios
      .post(`/api/comment/${id}/create`, {
        dataComment,
      });
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function deleteComment(id) {
  try {
    const response = await axios
      .delete(`/api/comment/${id}/delete`);
    return response.data;
  } catch (err) {
    return err;
  }
}

// Cloudinary
export async function uploadCloudinary(data) {
  try {
    return await axios.post(
      "https://api.cloudinary.com/v1_1/disqrp2r2/image/upload",
      data
    );
  } catch (err) {
    return err;
  }
};

export async function toggleLike(id) {
  try {
    const response = await axios
      .put(`/api/post/${id}/like`);
    return response.data;
  } catch (err) {
    return err;
  }
}

// Contact Message
export async function addMessage(from, to, message, image = "") {
  try {
    const response = await axios.post('/api/addMessage', { from, to, message, image });
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getMessages(from, to) {
  try {
    const response = await axios.post('/api/getMessages', { from, to });
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function setAsRead(from, to){
  try {
    const response = await axios
      .put("/api/message/read", { from, to });
    return response.data;
  } catch (err) {
    return err;
  }
}
export async function areThereUnRead(from,to){
  try {
    const response = await axios
      .get("/api/message/isRead", { from, to });
    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getFollowedUsers() {
  try {
    const response = await axios
      .post("/api/getFollowedUsers");
    return response;
  } catch (err) {
    return err;
  }
}

