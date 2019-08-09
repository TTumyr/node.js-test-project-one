const express = require('express');
const mongodb = require('mongodb');
const mdb = require('./utils/mdb');
const settings = require('./utils/settings');

const app = express();
const system = settings.system();
const process = settings.envVar();

// app.use components
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Mongo query
const mdbQuery = {
  operation: 'none',
  collection: 'none'
};

//basic routes --> TODO
app.get('/', (req, res) => {
  mdbQuery.operation = 'find';
  mdbQuery.collection = 'data1';
  mdb.db
    .collection(mdbQuery.collection)
    .find()
    .toArray((err, items) => {
      res.render('index.ejs', { items });
    });
});

const mdbConSetup = () => {
  //set up db connection
  sendApp = null;
  if (system.mdb) {
    if (system.listendb) {
      sendApp = app;
    }
    mdb.connect(sendApp, system, mdbQuery);
  }

  //basic server listening, db independent
  if (!system.listendb) {
    app.listen(system.port, console.log(`listening on port: ${system.port}`));
  }
};
mdbConSetup();
