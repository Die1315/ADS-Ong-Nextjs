const express = require("express");
const next = require("next");
const createError = require('http-errors');
const mongoose = require("mongoose") 
const port = process.env.PORT || 3000;
const hostname =  process.env.HOST || 'localhost';
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();
const routes = require("./config/routes.config")
const cookieParser = require('cookie-parser');

app
  .prepare()
  .then(() => {
    require('./config/db.config'); 
    const socket = require("socket.io");
    const server = express();
    server.use(cookieParser());
    // server.use(express.urlencoded({ extended: true }));
    server.use(express.json());
    server.use("/api", routes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });
     
    server.use((error, req, res, next)=>{
      if (error instanceof mongoose.Error.ValidationError) {
        error = createError(400, error);
      } else if (error instanceof mongoose.Error.CastError && error.message.includes('_id')) {
        error = createError(404, 'Resource not found');
      } else if (error?.message.includes('E11000')) {
        error = createError(409, 'Duplicated');
      } else if (!error.status) {
        error = createError(500, error);
      }
    
      if (error.status >= 500){
        console.log(error);
      }
    
      const data = {};
      data.message = error.message;
    
      if (error.errors) {
        data.errors = Object.keys(error.errors)
          .reduce((errors, key) => {
            errors[key] = error.errors[key].message;
            return errors;
          }, {});
      }
      res.status(error.status).json(data);
    
    
    })

    const sr = server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on ${port}`);
    });

    const io = socket(sr, {
      cors: {
        origin: "*",
        credentials: true,
      },
    });

    
    global.onlineUsers = new Map();

    io.on("connection", (socket) => {
      global.chatSocket = socket;  
      socket.on("add-user", (userId) => {      
        console.log(onlineUsers);
        onlineUsers.set(userId, socket.id);
      });
      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
      });
    });
    
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

