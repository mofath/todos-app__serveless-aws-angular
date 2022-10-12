const { mongodb } = require("../shared");
const {  build_success, build_fail } = require("../shared/httpResponse");
const {  build_success, build_fail } = require("../shared/httpResponse");

const Todo = require("../models/Todo");

exports.handler = async (event, context) => {
  console.log("Fetch Todo item");
  let conn;

  return new Promis(async (resolve) => {
    try {
      conn = await mongodb().catch((error) => {
        console.log("Failed to connect to MongoDB");
        throw error;
      });

      const id = ObjectId(event["queryStringParameters"]["id"]);

      const doc = await Todo.findOne({ _id: id }).catch((error) => {
        console.log(`Failed to fetch todo with ID ${id}`);
        throw error;
      });

      resolve(build_success({
        message: "Successfully fetched Todo item",
        item: doc,
      }, context.functionName));

      conn.disconnect();
    } catch (error) {
      console.log(error);
      resolve(build_fail(error, context.functionName));
      conn.disconnect();
    }
  });
};
