const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI; // mude para url local caso queira testar em sua máquina
const DB_NAME = 'Cookmaster';

let db = null;

// const OPTIONS = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

const client = new MongoClient(uri, { useUnifiedTopology: true });
const connection = () => (db
  ? Promise.resolve(db)
  : client.connect().then((conn) => {
    db = conn.db(DB_NAME);
    return db;
  }));

module.exports = { connection };
