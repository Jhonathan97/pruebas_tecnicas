import app from './app';
import { timejas } from './controllers/infectedController';
async function main(){
    const port = 3000;
    await app.listen(port);
    console.log('Server on port: ', port);
}

main();
var cron = require('node-cron');

cron.schedule('0 */1 * * * * *', () => {
  timejas();
});