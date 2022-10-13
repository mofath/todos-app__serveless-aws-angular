const { mongodb } = require("./shared");
const Todo = require("./models/Todo");
const { InternalServerError, BadRequestError } = require("./shared/errors");

// 634723816431765a9b90c4e8

/**
 * @description Fetch Todo document
 * @param {String} id an string represents the ID of the todo to be fetched
 * @returns {Promise} a promise which resolves when success with fetched Todo or reject with an error
 */
module.exports.getTodo = async (id) => {
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

      const item = await Todo.findOne({ _id: id }).lean().catch((error) => {
        console.log(`Exception: Failed to retrieve Todo with ID ${id} \n`, error);
        throw new InternalServerError(
          `Something went wrong while retrieve Todo with ID ${id}`,
          error.toString()
        );
      });

      if (!item) {
        console.log('Unable to find item', id);
        throw new BadRequestError('Unable to find Todo');
      }

      await conn.disconnect();

      ressolve(item);
    } catch (error) {
      await conn.disconnect();
      reject(error);
    }
  });
};
