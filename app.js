const express = require('express');
const session = require('express-session');
const mdb = require('./utils/mdb');
const settings = require('./utils/settings');
const routes = require('./routes/routes.js');
const app = express();
const system = settings.system();
const mdbStore = mdb.store(system);

// app.use components
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: '1234#changeOnDeploy',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: mdbStore
  })
);
app.use(routes);

const mdbConSetup = () => {
  //set up db connection
  sendApp = null;
  if (system.mdb) {
    if (system.listendb) {
      sendApp = app;
    }
    mdb.connect(sendApp, system, mdb.query);
  }

  //independent listening
  if (!system.listendb) {
    app.listen(system.port, console.log(`listening on port: ${system.port}`));
  }
};
mdbConSetup();
