const mdb = require('../utils/mdb');
const settings = require('../utils/settings');
const system = settings.system();

exports.home = (req, res, next) => {
  mdb.query.operation = 'find';
  mdb.query.collection = 'data1';
  mdb.db
    .collection(mdb.query.collection)
    .find()
    .toArray((err, items) => {
      res.render('index.ejs', { items, system, pgTitle: 'nodejs', path: '/' });
    });
};
