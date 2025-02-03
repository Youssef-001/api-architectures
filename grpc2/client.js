const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the proto file
const packageDef = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const todoPackage = grpcObject.todoPackage;

// Create a gRPC client
const client = new todoPackage.Todo("localhost:4000", grpc.credentials.createInsecure());

// Call createTodo
client.createTodo({ id: 1, text: "Learn gRPC" }, (err, response) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Created Todo:", response);
    }
});

// Call readTodos
client.readTodos({}, (err, response) => {
    if (err) {
        console.error("Error:", err);
    } else {
        console.log("Todos:", response);
    }
});
