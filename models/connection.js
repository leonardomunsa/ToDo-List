const mongodb = require('mongodb').MongoClient;
require('dotenv').config();

const MONGO_DB_URL = process.env.MONGO_DB_URL || `mongodb+srv://Munsa:${process.env.MONGO_DB_PASSWORD}@cluster0.hz2el.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const DB_NAME = 'todolist';

module.exports = () => mongodb.connect(MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then((connection) => connection.db(DB_NAME))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
