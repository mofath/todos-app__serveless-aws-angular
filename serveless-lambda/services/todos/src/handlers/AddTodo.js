const { mongodb } = require("../shared");
const { build_success, build_fail } = require("../shared/httpResponse");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  console.log("Add Todo item");

  let conn;

  return new Promis(async (resolve) => {
    try {
      conn = await mongodb().catch((error) => {
        console.log("Failed to connect to MongoDB");
        throw error;
      });

      await Todo.insertOne(event).catch((error) => {
        console.log("Failed to insert todo item");
        throw error;
      });

      resolve(build_success({
        message: "Successfully Added Todo item",
      }, context.functionName));

      conn.disconnect();
    } catch (error) {
      console.log(error);
      resolve(build_fail(error, context.functionName));
      conn.disconnect();
    }
  });
};
