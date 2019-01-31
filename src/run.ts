import { Storage, createGameList, sign, tap, Game, isNotEmpty, wait, map, GAME_INTERVAL, CELLS, toBase58 } from './';
import { get, post, Response } from 'superagent';
import * as moment from 'moment';
import { Seed, libs, config, TESTNET_BYTE } from '@waves/signature-generator';
import { data } from 'waves-transactions';
import { splitEvery } from 'ramda';


config.set({ networkByte: TESTNET_BYTE });

console.log(process.argv[2]);

const storage = new Storage();
const node = 'https://pool.testnet.wavesnodes.com';
const seed = new Seed(process.argv[2]);
const address = seed.address;
const url = (path: string) => `${node}${path}`;

let lastGameTime: number | null = null;

console.log(`Seed is: "${seed.phrase}"`);
console.log(`Address is: "${seed.address}"`);

function startDay(): Promise<void> {
    const date = moment(Date.now()).startOf('day').toDate().getTime();

    console.log(`Start of day ${date}`);

    return storage.get(date)
        .then(list => {
            if (!list.length) {
                return createGameList()
                    .then(tap(storage.set(date)));
            }
            return list;
        })
        .then(list => {
            const key = `${date} result signature`;
            return get(url(`/addresses/data/${address}/${encodeURIComponent(key)}`))
                .catch(() => {

                    console.log('Has no game signature');

                    sign(list.map(game => game.result), seed)
                        .then(signature => {

                            console.log(`Game signature is ${signature}`);

                            const tx = data({
                                data: [
                                    {
                                        key,
                                        type: 'string',
                                        value: signature
                                    }
                                ]
                            }, seed.phrase);
                            return post(url('/transactions/broadcast'))
                                .retry(3)
                                .send(tx)
                                .then(tap(() => console.log('Success broadcast signature!')))
                                .then(() => Promise.resolve());
                        });
                });
        })
        .then(() => liveLoop(date));
}


function liveLoop(date: number): Promise<void> {

    if (moment(Date.now()).startOf('day').toDate().getTime() !== date) {
        return startDay();
    }

    const time = Date.now();

    return storage.get(date)
        .then(list => {
            if (!lastGameTime) {
                return list.filter(game => time > game.time);
            }
            const nextGameTime = lastGameTime + GAME_INTERVAL;
            return list.filter(game => nextGameTime - GAME_INTERVAL * 3 < game.time && game.time < time);

        })
        .then(list => {
            lastGameTime = list.length ? list[list.length - 1].time : lastGameTime;
            return sendList(list);
        })
        .then(() => wait(1000))
        .then(() => liveLoop(date));
}


function sendList(list: Array<Game>): Promise<void> {
    return Promise.all([
        map<Game, Game | null>(isGameInBlockChain)(list)
            .then((list: Array<Game | null>) => list.filter(isNotEmpty)),
        height()
    ]).then(([list, height]) => {

        if (!list.length) {
            return Promise.resolve();
        }

        return map((list: Array<Game>) => {
            const dataEntries = list.reduce((acc, game) => {
                const boolToByte = (value: boolean): number => value ? 1 : 0;
                const cell = CELLS[game.result];
                const bytes = [
                    0,
                    Number(game.result),
                    boolToByte(cell.isRed),
                    boolToByte(cell.isEven),
                    boolToByte(cell.isFirstHalf),
                    cell.isFirstThird ? 0 : cell.isMiddleThird ? 1 : 2,
                    cell.isFirstLine ? 0 : cell.isMiddleLine ? 1 : 2
                ];
                acc.push({
                    key: String(game.time),
                    type: 'string',
                    value: game.result.toString()
                });
                acc.push({
                    key: `${toBase58(String(game.time))}height`,
                    type: 'integer',
                    value: height
                });
                acc.push({
                    key: toBase58(String(game.time)),
                    type: 'binary',
                    value: libs.base64.fromByteArray(Uint8Array.from(bytes))
                });
                return acc;
            }, [] as any);
            const tx = data({
                timestamp: lastGameTime ? lastGameTime : undefined,
                data: dataEntries
            }, seed.phrase);

            return post(url('/transactions/broadcast'))
                .retry(3)
                .send(tx)
                .then(() => waitTransaction(tx));
        })(splitEvery(33, list)).then(() => Promise.resolve());
    });
}

startDay();

function waitTransaction(tx: { id: string }): Promise<void> {
    return wait(2000)
        .then(() => get(url(`/transactions/unconfirmed/info/${tx.id}`)))
        .then(() => waitTransaction(tx))
        .catch(() => get(url(`/transactions/info/${tx.id}`)))
        .then(() => Promise.resolve());
}

function height(): Promise<number> {
    return get(url('/blocks/height'))
        .then((response: Response & { body: { height: number } }) => response.body.height);
}

function isGameInBlockChain(game: Game): Promise<Game | null> {
    return get(url(`/addresses/data/${address}/${game.time}`))
        .then(() => null)
        .catch(() => game);
}
