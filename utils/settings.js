const dotenv = require('dotenv');
dotenv.config();
// System configuration
exports.system = () => {
  const system = {
    dbname: process.env.dbname,
    mdbCon: process.env.mdbCon,
    port: process.env.port || 3000,
    mdb: true,
    listendb: true
  };
  return system;
};
exports.envVar = () => {
  return process;
};
