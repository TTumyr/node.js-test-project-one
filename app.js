const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const mdb = require('./utils/mdb');
const settings = require('./utils/settings');

const config = settings.config();

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
  if (config.mdb) {
    if (config.listenIndb) {
      sendApp = app;
    }
    mdb.mongoConnect(sendApp, process);
  }

  //basic server listening, db independent
  if (!config.listenIndb) {
    app.listen(
      process.env.port,
      console.log(`listening on port: ${process.env.port}`)
    );
  }
};

connections();
