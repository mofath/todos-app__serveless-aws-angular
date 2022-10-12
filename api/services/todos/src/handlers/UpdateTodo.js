const { mongodb } = require("../shared");
const { build_success, build_fail } = require("../shared/httpResponse");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  console.log("Update Todo item");

  let conn;

  return new Promis(async (resolve) => {
    try {
      conn = await mongodb().catch((error) => {
        console.log("Failed to connect to MongoDB");
        throw error;
      });

      const id = ObjectId(event["queryStringParameters"]["id"]);

      var todo = {
        name: event.name,
        description: event.description,
      };

      const doc = await Todo.findOneAndUpdate(
        { _id: id },
        { $set: todo }
      ).catch((error) => {
        console.log(`Failed to upate todo Todo item with ${id}`);
        throw error;
      });

      resolve(build_success({
        message: "Successfully updated Todo item",
      }, context.functionName));

      conn.disconnect();
    } catch (error) {
      console.log(error);
      resolve(build_fail(error, context.functionName));
      conn.disconnect();
    }
  });
};
