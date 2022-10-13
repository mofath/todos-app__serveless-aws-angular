const { mongodb } = require("./shared");
const Todo = require("./models/Todo");
const { InternalServerError, BadRequestError } = require("./shared/errors");

/**
 * @description Updating Todo document
 * @param {Object} todo an object contains all the fields to be updated
 * @param {String} id an string represents the ID of the todo to be updated
 * @returns {Promise} a promise which resolves with the updated Todo item when success or reject with an error
 */
module.exports.updateTodo = async (id, todo) => {
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

      const updatedTodo = await Todo.findOneAndUpdate(
        { _id: id },
        { $set: todo },
        { new: true }
      ).catch((error) => {
        console.log(`Exception: Failed to update Todo with ID ${id} \n`, error);
        throw new InternalServerError(
          `Something went wrong while updating Todo with ID ${id}`,
          error.toString()
        );
      });

      if (!updatedTodo) {
        console.log('Unable to find item', id);
        throw new BadRequestError('Unable to find Todo');
      }

      await conn.disconnect();

      ressolve(updatedTodo);
    } catch (error) {
      await conn.disconnect();
      reject(error);
    }
  });
};
