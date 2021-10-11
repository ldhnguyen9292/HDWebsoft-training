import { Agenda } from "agenda";
import { connect, connection } from 'mongoose'
import * as config from './mongodb.json'

export async function run() {
    try {
        const agenda = new Agenda({ db: { address: config.url } });
        await connect(config.url)
        agenda.define('isGood', () => {
            console.log('Agenda run');
            // 0 = disconnected.
            // 1 = connected.
            // 2 = connecting.
            // 3 = disconnecting.
            // 4 = invalid credentials.    
            console.log('Mongo Connection Status', connection.readyState);  
        });
        await agenda.start();
        await agenda.every("1 minute", "isGood");
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
}

// run().catch(error => {
//     console.error(error);
//     process.exit(-1);
// });