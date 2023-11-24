const MongoStore = require('connect-mongo');
const chalk = require('chalk');

const store = new MongoStore({
  mongoUrl: 'mongodb://localhost:27017/session-db-testing',
  dbName: 'nodeauth-sessions'
});

store.on('create', () => {
  console.log(chalk.cyanBright('A session has been created'));
});

store.on('touch', () => {
  console.log(chalk.cyanBright('User session has been touched butnot modified'));
});

store.on('update', () => {
  console.log(chalk.cyanBright('User session has been updated'));
});

store.on('set', () => {
  console.log(chalk.cyanBright('A session has been created or updated'));
});

store.on('destroy', () => {
  console.log(chalk.cyanBright('User session has been destroyed manually'));
});

module.exports = store;
