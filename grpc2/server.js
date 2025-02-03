const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

const server = new grpc.Server();
const todos = [];

server.addService(todoPackage.Todo.service, {
    createTodo: createTodo,
    readTodos: readTodos
});


server.bindAsync("0.0.0.0:4000", grpc.ServerCredentials.createInsecure(), () => {
    console.log("gRPC server running on port 4000");
});


function createTodo(call, callback) {
    const todo = call.request;  // Extract todo data from request
    todos.push(todo);  // Store in memory
    console.log("Created Todo:", todo);
    callback(null, todo); // Respond with the created todo
}

function readTodos(call, callback) {
    console.log("Todos:", todos);
    callback(null, { items: todos }); // Return all todos
}