const dotenv = require('dotenv');
dotenv.config();
// System configuration
exports.system = () => {
  const system = {
    port: 3000,
    mdb: true,
    listenIndb: false
  };
  return system;
};
exports.envVar = () => {
  return process;
};
