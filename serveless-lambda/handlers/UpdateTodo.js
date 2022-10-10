const { mongodb } = require("../libs");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  let conn;
  try {
    conn = await mongodb();

    const id = ObjectId(event["queryStringParameters"]["id"]);
    await Todo.deleteOne({ _id: id });

    var todo = {
      name: event.name,
      description: event.description,
    };

    const doc = await Todo.findOneAndUpdate({ _id: id }, { $set: todo });

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
