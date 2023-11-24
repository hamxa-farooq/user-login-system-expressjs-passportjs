const MongoStore = require('connect-mongo');

const store = new MongoStore({
  mongoUrl: 'mongodb://localhost:27017/session-db-testing',
  dbName: 'nodeauth-sessions'
});

store.on('create', () => {
  // log(chalk.blue)
  console.log('A session has been created');
});

store.on('touch', () => {
  console.log('User ession has been touched butnot modified');
});

store.on('update', () => {
  console.log('A session has been updated');
});

store.on('set', () => {
  console.log('A session has been created or updated');
});

store.on('destroy', () => {
  console.log('User session has been destroyed manually');
});

module.exports = store;
