const { z } = require("zod");

const validateUser = (username, password) => {
  let User = z.object({
    username: z.string(),
    password: z.string(),
  });
  return User.parse({ username, password });
};

module.exports = {
  validateUser,
};

