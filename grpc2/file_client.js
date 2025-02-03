
import grpc from '@grpc/grpc-js';
import protoLoader from '@grpc/proto-loader';

const PROTO_PATH = './file_watcher.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const fileWatcherProto = grpc.loadPackageDefinition(packageDefinition).FileWatcher;

const client = new fileWatcherProto('localhost:50051', grpc.credentials.createInsecure());


const firstArgument = process.argv[2]; 

// Get recent changes
client.GetRecentChanges({}, (err, response) => {
  if (err) console.error(err);
  else console.log('Recent Changes:', response.changes);
});

// Stream file changes
const call = client.WatchDirectory({ path: firstArgument });
call.on('data', (change) => console.log('File Change:', change));
call.on('end', () => console.log('Stream ended.'));
