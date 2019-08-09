const express = require('express');
const mongodb = require('mongodb');
const mdb = require('./utils/mdb');
const settings = require('./utils/settings');

const app = express();
const system = settings.system();
const process = settings.envVar();
// Mongo query
const mdbQuery = {
  operation: 'none',
  collection: 'none'
};
// app.use components
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//test connection
const mdbConnect = async (system, mdbQuery) => {
  mdb.connect(null, system, mdbQuery);
};

//basic routes --> TODO
app.get('/', (req, res) => {
  mdbQuery.operation = 'find';
  mdbQuery.collection = 'data1';
  mdbConnect(system, mdbQuery).then(data => {
    console.log(data);
  });
  res.render('index.ejs');
});

const connections = () => {
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
connections();
