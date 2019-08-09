const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (app, process, system) => {
  MongoClient.connect(process.env.mdbCon, { useNewUrlParser: true }).then(
    client => {
      //server listen with mdb
      if (app)
        app.listen(
          system.port,
          console.log(`listening on port: ${process.env.port} with mDB`)
        );
    }
  );
};

const mdbStore = (mongoStore, process, system) => {
  const store = new mongoStore({
    uri: process.env.mdbCon,
    collection: 'sessions',
    clear_interval: 3600
  });
  return store;
};

exports.mongoConnect = mongoConnect;
exports.mdbStore = mdbStore;
