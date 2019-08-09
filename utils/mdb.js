const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (app, process) => {
  MongoClient.connect(process.env.mdbCon, { useNewUrlParser: true }).then(
    client => {
      //server listen with mdb
      if (app)
        app.listen(
          process.env.port,
          console.log(`listening on port: ${process.env.port} with mDB`)
        );
    }
  );
};

const mdbStore = (mongoStore, process) => {
  const store = new mongoStore({
    uri: process.env.mdbCon,
    collection: 'sessions',
    clear_interval: 3600
  });
  return store;
};

exports.mongoConnect = mongoConnect;
exports.mdbStore = mdbStore;
