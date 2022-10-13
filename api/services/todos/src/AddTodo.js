const { mongodb } = require("./shared");
const Todo = require("./models/Todo");
const { InternalServerError } = require("./shared/errors");

/**
 * @description Creating new Todo item
 * @param {Object} todo an object contains all the needed data to build the message and send it
 * @returns {Promise} a promise which resolves with the item created or reject with an error
*/
module.exports.addTodo = async (todo) => {
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

     const newlyCreatedItem = await Todo.create(todo).catch((error) => {
        console.log("Exception: Failed to insert todo\n", error);
        throw new InternalServerError(
          "Something went wrong while inserting new todo",
          error.toString()
        );
      });

      await conn.disconnect();

      ressolve(newlyCreatedItem)
    } catch (error) {
      await conn.disconnect();
      reject(error);
    }
  });
};