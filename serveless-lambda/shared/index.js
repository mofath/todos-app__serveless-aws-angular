const mongodb = require("./mongodb");
const { validateUser } = require("./validators");

module.exports = {
  mongodb,
  validateUser,
};
