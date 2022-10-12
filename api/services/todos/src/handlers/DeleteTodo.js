const { mongodb } = require("../shared");
const { build_success, build_fail } = require("../shared/httpResponse");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  console.log("Delete Todo item");

  let conn;

  return new Promis(async (resolve) => {
    try {
      conn = await mongodb().catch((error) => {
        console.log("Failed to connect to MongoDB");
        throw error;
      });

      const id = ObjectId(event["queryStringParameters"]["id"]);

      await Todo.deleteOne({ _id: id }).catch((error) => {
        console.log(`Failed to delete todo with ID ${id}`);
        throw error;
      });

      resolve(build_success({
        message: "Successfully deleted Todo item",
      }, context.functionName));
      

      conn.disconnect();
    } catch (error) {
      console.log(error);
      resolve(build_fail(error, context.functionName));
      conn.disconnect();
    }
  });
};
