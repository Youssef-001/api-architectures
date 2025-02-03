const chokidar = require('chokidar');

// Initialize a watcher
const watcher = chokidar.watch('./testing_folder', {
  ignored: /^\./, // Optional: Ignore dotfiles (like .git, .DS_Store)
  persistent: true // Keep the watcher running
});

// Event listeners
watcher
  .on('add', path => console.log(`File ${path} has been added`))
  .on('change', path => console.log(`File ${path} has been changed`))
  .on('unlink', path => console.log(`File ${path} has been removed`));
