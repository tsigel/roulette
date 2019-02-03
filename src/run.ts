import { createAPI, getStartOfDay, wait } from './index';
import { Storage } from './storage';
import { Seed, config, TESTNET_BYTE } from '@waves/signature-generator';


config.set({ networkByte: TESTNET_BYTE });
console.log(process.argv[2]);

const storage = new Storage();
const node = 'https://pool.testnet.wavesnodes.com';
const seed = new Seed(process.argv[2]);


console.log(`Seed is: "${seed.phrase}"`);
console.log(`Address is: "${seed.address}"`);

const api = createAPI({ storage, node, seed });
let date: number | null = null;

const run = () => {
    const today = getStartOfDay();

    if (!date && date !== today) {
        api.startDay(today)
            .then(() => (date = today))
            .then(run, run);
    }

    api.liveLoop(today)
        .then(() => wait(1000))
        .then(run, run);
};

run();
