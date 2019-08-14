const mongodb = require('mongodb');
const session = require('express-session');
const mdbStore = require('connect-mongodb-session')(session);
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connect = async (app, system, data) => {
  MongoClient.connect(
    system.mdbCon,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err;
      if (app)
        app.listen(
          system.port,
          console.log(`listening on port: ${system.port} with mDB`)
        );
      db = client.db(system.dbname);
      exports.db = db;
    }
  );
};

const store = system => {
  const store = new mdbStore({
    uri: system.mdbCon,
    collection: 'sessions',
    clear_interval: 3600
  });
  return store;
};

const query = {
  operation: 'none',
  collection: 'none'
};

exports.connect = connect;
exports.store = store;
exports.query = query;
