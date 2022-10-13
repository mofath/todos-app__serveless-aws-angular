const { mongodb } = require("./shared");
const Todo = require("./models/Todo");
const { InternalServerError } = require("./shared/errors");

/**
 * @description Deleting Todo document
 * @param {String} id an string of the todo to be deleted
 * @returns {Promise} a promise which resolves when process success or reject with an error
 */
module.exports.deleteTodo = async (id) => {
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

      await Todo.deleteOne({ _id: id }).catch((error) => {
        console.log(`Exception: Failed to delete Todo with ID ${id} \n`, error);
        throw new InternalServerError(
          `Something went wrong while deleting Todo with ID ${id}`,
          error.toString()
        );
      });

      await conn.disconnect();

      ressolve();
    } catch (error) {
      await conn.disconnect();
      reject(error);
    }
  });
};
