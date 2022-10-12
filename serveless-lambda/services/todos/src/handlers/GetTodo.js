const { mongodb } = require("../shared");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  let conn;
  try {
    conn = await mongodb();

    const id = ObjectId(event["queryStringParameters"]["id"]);
    const doc = await Todo.findOne({ _id: id });

    callback(null, {
      statusCode: 200,
      item: doc,
    });

    conn.disconnect();
  } catch (error) {
    console.log(error);
    callback(null, {
      statusCode: 500,
      body: JSON.stringify({ msg: error }),
    });

    conn.disconnect();
  }
};
