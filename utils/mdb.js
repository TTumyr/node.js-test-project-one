const mongodb = require('mongodb');
const session = require('express-session');
const mdbStore = require('connect-mongodb-session')(session);
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;

const connect = async (app, system) => {
  MongoClient.connect(
    system.mdb.con,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) throw err;
      if (app)
        app.listen(
          system.port,
          console.log(`listening on port: ${system.port} with mDB`)
        );
      db = client.db(system.db);
      exports.db = db;
    }
  );
};

const store = system => {
  const store = new mdbStore({
    uri: system.mdb.con,
    collection: 'sessions',
    clear_interval: 3600
  });
  return store;
};

exports.connect = connect;
exports.store = store;
