const mongoose = require("mongoose");
mongoose.set('strictQuery', false);
// const connexion = mongoose.connect(
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferMaxEntries: 0,
    useFindAndModify: false,
    useCreateIndex: true
  },
  () => {
    console.log("mongdb is connected")
  }
);


// module.exports = connexion;