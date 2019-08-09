const express = require('express');
const mongodb = require('mongodb');
const mdb = require('./utils/mdb');
const settings = require('./utils/settings');

const app = express();
const system = settings.system();
const process = settings.envVar();
// Mongo
// app.use components
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//basic routes --> TODO
app.get('/', (req, res) => {
  res.render('index.ejs');
});

const connections = () => {
  //set up db connection
  sendApp = null;
  if (system.mdb) {
    if (system.listenIndb) {
      sendApp = app;
    }
    mdb.mongoConnect(sendApp, process, system);
  }

  //basic server listening, db independent
  if (!system.listenIndb) {
    app.listen(system.port, console.log(`listening on port: ${system.port}`));
  }
};
connections();
