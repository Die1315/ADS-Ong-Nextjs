import axios from "axios";


export function login(credentials) {
   return axios
    .post("/api/login", {
      credentials,
    })
    .then((response) => response.data)
      
}
