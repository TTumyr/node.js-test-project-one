## node.js-test-project-one development notes (issues, todo, etc)

---

TODO => Improve object passing between app.js, routes.js, and site.js. Cleanup verification and sanitation routines. Create model objects e.g. User.

Done => create separation between app/routes/controls when or if the project gets bigger.

FIXED Issues => Connection to MongoDB currently not working properly. Performs CRUD, not waiting for data on app.get.
Seems to be working just as well with listening triggered outside of the connection string => TODO test this with delay.
