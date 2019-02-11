import { createAPI, getStartOfDay, isTheSameDay, wait } from './index';
import { Storage } from './storage';
import { Seed, config, TESTNET_BYTE } from '@waves/signature-generator';
import { get } from 'superagent';


config.set({ networkByte: TESTNET_BYTE });
console.log(process.argv[2]);

const storage = new Storage();
const node = 'https://pool.testnet.wavesnodes.com';
const seed = new Seed(process.argv[2]);


console.log(`Seed is: "${seed.phrase}"`);
console.log(`Address is: "${seed.address}"`);

let date: number | null = null;

get(`${node}/addresses/scriptInfo/${seed.address}`)
    .then(response => response.body.extraFee)
    .then(extraFee => {
        const api = createAPI({ storage, node, seed, extraFee });

        const run = () => {
            const today = getStartOfDay();

            if (!date || !isTheSameDay(today, date)) {
                api.startDay(today)
                    .then(() => (date = today))
                    .then(run, run);
                return null;
            }

            api.liveLoop(today)
                .then(() => wait(1000))
                .then(run, run);
        };

        run();
    });
