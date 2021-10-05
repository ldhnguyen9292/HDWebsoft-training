import { Agenda } from "agenda";
import * as config from './mongodb.json'

export async function run() {
    try {
        const agenda = new Agenda({ db: { address: config.url } });

        agenda.define('isGood', () => {
            console.log('Connect to db is good');
        });
        await agenda.start();
        await agenda.every("one minute", "isGood");
    } catch (error) {
        console.log(error);
        process.exit(-1);
    }
}

// run().catch(error => {
//     console.error(error);
//     process.exit(-1);
// });