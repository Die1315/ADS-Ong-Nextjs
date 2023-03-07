import axios from "../service/client";


export function login(credentials) {
  return axios
    .post("/api/login", {
      credentials,
    })
    .then((response) => response.data)
    .catch((err) => console.log(err));
}

export function getOngList() {
  return axios
    .get("/api/ongs", {})
    .then((response) => response.data);
}
