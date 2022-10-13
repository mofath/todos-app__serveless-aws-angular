const { mongodb } = require("./shared");
const Todo = require("./models/Todo");
const { InternalServerError } = require("./shared/errors");

// 634723816431765a9b90c4e8

/**
 * @description Fetch Todos List
 * @returns {Promise} a promise which resolves with an array of items or reject with an error
 */
 module.exports.getTodosList = async () => {
  return new Promise(async (ressolve, reject) => {
    let conn;

    try {
      conn = await mongodb().catch((error) => {
        console.log("Exception: Failed to connect to database\n", error);
        throw new InternalServerError(
          "Something went wrong while connecting to database",
          error.toString()
        );
      });

      const items = await Todo.find().lean().catch((error) => {
        console.log(`Exception: Failed to retrieve Todo items \n`, error);
        throw new InternalServerError(
          `Something went wrong while retrieving Todo items `,
          error.toString()
        );
      });

      await conn.disconnect();

      ressolve(items);
    } catch (error) {
      await conn.disconnect();
      reject(error);
    }
  });
};
