

const grpc = require('@grpc/grpc-js')
const protoLoader = require('@grpc/proto-loader');
const chokidar = require('chokidar')

const PROTO_PATH = './file_watcher.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const fileWatcherProto = grpc.loadPackageDefinition(packageDefinition).FileWatcher;


let recentChanges = [];

function onChange(path, event, call)
{
    const change = { path, event, timestamp: Date.now() };

    recentChanges.push(change);

    if (recentChanges.length > 100) {
        recentChanges.shift();
    }
 call.write(change);


}

const watchDirectory = (call) => {
    const watcher = chokidar.watch(call.request.path, {persistent: true});

    watcher
  .on('add', (path) => {onChange(path, 'add', call); console.log(`File ${path} has been added`)})
  .on('change', (path) => {onChange(path, 'change', call); console.log(`File ${path} has been changed`)})
  .on('unlink', (path) => {onChange(path, 'unlink', call); console.log(`File ${path} has been removed`)})


  call.on('end', () => watcher.close());

}


const getRecentChanges = (_, callback) => {
    callback(null, { changes: recentChanges });
  };
  
  const server = new grpc.Server();
  server.addService(fileWatcherProto.service, { WatchDirectory: watchDirectory, GetRecentChanges: getRecentChanges });
  server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC server running on port 50051');
  });