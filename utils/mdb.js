const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (app, process) => {
  MongoClient.connect(process.env.connect, { useNewUrlParser: true })
    .then(client => {
      db = client.db();
      console.log('connection to mDB established');
      //server listen with mdb
      if (app)
        app.listen(
          process.env.port,
          console.log(`listening on port: ${process.env.port} with mDB`)
        );
    })
    .catch(err => {
      console.log(err);
    });
};

const getMdbEnv = () => {
  return process.env.connect;
};

const getDb = () => {
  if (db) {
    console.log(db);
    return db;
  }
  throw 'No database';
};

const mdbStore = mongoStore => {
  const store = new mongoStore({
    uri: process.env.connect,
    collection: 'sessions',
    clear_interval: 3600
  });
  return store;
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.getMdbEnv = getMdbEnv;
exports.mdbStore = mdbStore;
