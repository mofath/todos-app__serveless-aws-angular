var GetTodoList = require("./handlers/GetTodoList");
var AddTodo = require("./handlers/AddTodo");
var UpdateTodo = require("./handlers/UpdateTodo");
var GetTodo = require("./handlers/GetTodo");
var DeleteTodo = require("./handlers/DeleteTodo");

exports.handler = (event, context, callback) => {
  const routeMap = {
    ListTodo: GetTodoList,
    AddTodo: AddTodo,
    UpdateTodo: UpdateTodo,
    GetTodo: GetTodo,
    DeleteTodo: DeleteTodo,
  };

  function getRoute() {
    var action = process.env.ACTION;
    var route = routeMap[action];

    if (route === undefined) return;

    return route(event, context, callback);
  }

  function updateEventLoopIgnore() {
    var ignoreEventLoop = process.env["IGNORE_EVENT_LOOP"];
    if (ignoreEventLoop == "YES") {
      context.callbackWaitsForEmptyEventLoop = false;
    }
  }

  updateEventLoopIgnore();

  return getRoute();
};
