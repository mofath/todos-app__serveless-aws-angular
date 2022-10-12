const { mongodb } = require("../shared");
const Todo = require("../models/Todo");

exports.handler = async (event, context, callback) => {
  let conn;
  try {
    conn = await mongodb();
    
    const items = await Todo.find({}).lean();

    callback(null, {
      statusCode: 200,
      items,
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
