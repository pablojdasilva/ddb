const app = require('./app');

init();

async function init() {
  try {
    app.listen(3000, () => {
      console.log('Express App Listening on Port 3000');
    });
  } catch (error) {
    console.log(error);
    console.error(`An error occurred: ${JSON.stringify(error)}`);
    process.exit(1);
  }
}