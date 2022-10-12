const { mongodb } = require("../shared");
const { build_success, build_fail } = require("../shared/httpResponse");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  console.log("List Todo items");

  let conn;

  return new Promis(async (resolve) => {
    try {
      conn = await mongodb().catch((error) => {
        console.log("Failed to connect to MongoDB");
        throw error;
      });

      const items = await Todo.find({})
        .lean()
        .catch((error) => {
          console.log(`Failed to list todos`);
          throw error;
        });

      resolve(build_success({
        message: "Successfully fetched Todod list",
        items,
      }, context.functionName));

      conn.disconnect();
    } catch (error) {
      console.log(error);
      resolve(build_fail(error, context.functionName));
      conn.disconnect();
    }
  });
};
