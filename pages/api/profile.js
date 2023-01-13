import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  //console.log(req.cookie)
  const { myTokenName } = req.cookies;
  
  if (!myTokenName){
    return res.status(401).json({error: 'no token'})
    }
  try {
    const user = verify(myTokenName, "secret"); //se pone en variable de entorno
    console.log(user)
    return res.json({ email: user.email, username: user.username }); //devolver datos de usuario dela base de datos
  } catch (err) {
    return res.status(404).json({ error: "invalid token" });
  }
}
