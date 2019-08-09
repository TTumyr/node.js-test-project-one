const mongodb = require('mongodb');
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
      if (data.operation === 'find') {
        let result = db
          .collection(data.collection)
          .find()
          .toArray()
          .then(content => {
            console.log(content);
            return content;
          });
      }
    }
  );
};

const store = (mongoStore, system) => {
  const store = new mongoStore({
    uri: system.mdbCon,
    collection: 'sessions',
    clear_interval: 3600
  });
  return store;
};

exports.connect = connect;
exports.store = store;
