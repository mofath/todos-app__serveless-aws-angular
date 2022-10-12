const mongoose = require("mongoose");

const DBUSER = "mhmd";
const DBPASSWORD = "todos22";
const MONGODB =
  "cluster0.ikxcm1l.mongodb.net/todos-db?retryWrites=true&w=majority";

const options = {
  bufferCommands: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri = `mongodb+srv://${DBUSER}:${DBPASSWORD}@${MONGODB}`;

const mongodb = () => mongoose.connect(uri, options);

module.exports = mongodb;
