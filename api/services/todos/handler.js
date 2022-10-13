const { build_success, build_fail } = require("./src/shared");
const { addTodo } = require("./src/AddTodo");
const { deleteTodo } = require("./src/DeleteTodo");
const { getTodo } = require("./src/GetTodo");
const { getTodosList } = require("./src/GetTodoList");
const { updateTodo } = require("./src/UpdateTodo");

module.exports.listTodos = async (event, context) => {
  return new Promise(async (resolve) => {
    try {
      const items = await getTodosList().catch((error) => {
        throw error;
      });

      resolve(
        build_success(
          { message: "Fetched todos list Succssfully", items },
          context.functionName
        )
      );
    } catch (err) {
      resolve(build_fail(err, context.functionName));
    }
  });
};

module.exports.getTodo = async (event, context) => {
  return new Promise(async (resolve) => {
    try {
      const id = ObjectId(event["queryStringParameters"]["id"]);

      const item = await getTodo(id).catch((error) => {
        throw error;
      });

      resolve(
        build_success(
          { message: "Succssfully fetched Todo item", item },
          context.functionName
        )
      );
    } catch (err) {
      resolve(build_fail(err, context.functionName));
    }
  });
};

module.exports.addTodo = async (event, context) => {
  return new Promise(async (resolve) => {
    try {
      const item = await addTodo(event).catch((error) => {
        throw error;
      });

      resolve(
        build_success(
          { message: "Successfully inserted Todo item", item },
          context.functionName
        )
      );
    } catch (err) {
      resolve(build_fail(err, context.functionName));
    }
  });
};

module.exports.updateTodo = async (event, context) => {
  return new Promise(async (resolve) => {
    try {
      const id = ObjectId(event["queryStringParameters"]["id"]);

      var todo = {
        name: event.name,
        description: event.description,
      };

      const item = await updateTodo(id, todo).catch((error) => {
        throw error;
      });

      resolve(
        build_success(
          { message: "Successfully updated Todo item", item },
          context.functionName
        )
      );
    } catch (err) {
      resolve(build_fail(err, context.functionName));
    }
  });
};

module.exports.deleteTodo = async (event, context) => {
  return new Promise(async (resolve) => {
    try {
      const id = ObjectId(event["queryStringParameters"]["id"]);

      const item = await deleteTodo(id).catch((error) => {
        throw error;
      });

      resolve(
        build_success(
          { message: "Successfully deleted Todo item", item },
          context.functionName
        )
      );
    } catch (err) {
      resolve(build_fail(err, context.functionName));
    }
  });
};
