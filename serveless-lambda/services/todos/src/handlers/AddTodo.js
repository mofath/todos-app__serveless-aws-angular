const { mongodb } = require("../shared");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  let conn;
  try {
    conn = await mongodb();

    await Todo.insertOne(event);

    callback(null, { statusCode: 201, message: "insert completed" });

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
