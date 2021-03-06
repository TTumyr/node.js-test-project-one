const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const csrf = require('csurf');
const mdb = require('./utils/mdb');
const settings = require('./utils/settings');
const app = express();
const system = settings.system();
const mdbStore = mdb.store(system);

const mdbInit = async () => {
  sendApp = null;
  if (system.usemdb) {
    if (system.listendb) {
      sendApp = app;
    }
    await mdb.connect(sendApp, system);
  }
};
const mainInit = async () => {
  // app.use components
  const routes = require('./routes/routes.js');
  app.set('view engine', 'ejs');
  app.use(express.static('public'));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(flash());
  //app.use(csrf());  // CSRF protection on deployment. Add:  <input type="hidden" name="_csrf" value="<%= csrfToken %>">  to input forms.
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
};
const serverStart = async () => {
  await mdbInit();
  mainInit();

  //independent listening
  if (!system.listendb) {
    app.listen(system.port, console.log(`listening on port: ${system.port}`));
  }
};
serverStart();
