const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

mongoose.connect(
  process.env.MONGODB_URI
);

mongoose.connection.on("connected", () => {
  console.info("mongdb is connected")
});

mongoose.connection.on("error", (err) => {
  console.error("mongdb connection error", err)
});

mongoose.connection.on("disconnected", () => {
  console.info("mongdb disconnected")
});
