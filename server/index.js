const express = require("express");
const next = require("next");

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
    const server = express();
    server.use(cookieParser());

    server.use(express.json());
    server.use("/api", routes);

    server.get("*", (req, res) => {
      return handle(req, res);
    });
  
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on ${port}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

