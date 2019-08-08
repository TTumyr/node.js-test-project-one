const dotenv = require('dotenv');
dotenv.config();
// System configuration
exports.config = () => {
  const config = {
    mdb: true,
    listenIndb: false
  };
  return config;
};
exports.envVar = () => {
  return process;
};
