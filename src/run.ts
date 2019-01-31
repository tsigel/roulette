import {
    Storage,
    createGameList,
    DAY_PATTEN,
    sign,
    tap,
    Game,
    isNotEmpty,
    wait,
    DAY_TIME_PATTEN,
    map,
    GAME_INTERVAL, CELLS
} from './';
import { get, post, Response } from 'superagent';
import * as moment from 'moment';
import { Seed, libs, config, TESTNET_BYTE, utils } from '@waves/signature-generator';
import { data } from 'waves-transactions';
import { splitEvery } from 'ramda';


config.set({ networkByte: TESTNET_BYTE });

const storage = new Storage();
const node = 'https://pool.testnet.wavesnodes.com';
const seed = new Seed(process.argv[2]);
const address = seed.address;
const url = (path: string) => `${node}${path}`;

let lastGameTime: string | null = null;

console.log(`Seed is: "${seed.phrase}"`);
console.log(`Address is: "${seed.address}"`);

function startDay(): Promise<void> {
    const date = moment().format(DAY_PATTEN);

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


function liveLoop(date: string): Promise<void> {

    console.log(`Live loop for ${date}`);

    const time = Date.now();
    const dateString = moment(time).format(DAY_PATTEN);

    if (dateString !== date) {
        return startDay();
    }

    console.log('The same day');

    return storage.get(moment().format(DAY_PATTEN))
        .then(list => {
            if (!lastGameTime) {
                return list.filter(game => time > moment(game.time, DAY_TIME_PATTEN).toDate().getTime());
            }
            const nextGameTime = moment(lastGameTime, DAY_TIME_PATTEN).add(GAME_INTERVAL, 'milliseconds');
            const nextGame = list.find(game => game.time === nextGameTime.format(DAY_TIME_PATTEN));
            return time > nextGameTime.toDate().getTime() ? nextGame ? [nextGame] : [] : [];
        })
        .then(list => {
            lastGameTime = list.length ? list[list.length - 1].time : lastGameTime;
            return sendList(list);
        })
        .then(() => wait(1000))
        .then(() => liveLoop(date));
}


function sendList(list: Array<Game>): Promise<void> {

    console.log(`Send list ${list}`);

    return Promise.all([
        map<Game, Game | null>(isGameInBlockchain)(list)
            .then((list: Array<Game | null>) => list.filter(isNotEmpty)),
        height()
    ]).then(([list, height]) => {

        console.log(`List for broadcast ${list}`);

        if (!list.length) {
            return Promise.resolve();
        }

        return Promise.all(splitEvery(33, list).map(list => {
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
                    key: game.time,
                    type: 'string',
                    value: game.result.toString()
                });
                acc.push({
                    key: `${libs.base58.encode(utils.convert.stringToByteArray(game.time) as any)}height`,
                    type: 'integer',
                    value: height
                });
                acc.push({
                    key: libs.base58.encode(utils.convert.stringToByteArray(game.time) as any),
                    type: 'binary',
                    value: libs.base64.fromByteArray(Uint8Array.from(bytes))
                });
                return acc;
            }, [] as any);
            const tx = data({
                timestamp: lastGameTime ? moment(lastGameTime as string, DAY_TIME_PATTEN).toDate().getTime() : undefined,
                data: dataEntries
            }, seed.phrase);
            return post(url('/transactions/broadcast'))
                .retry(3)
                .send(tx);
        }))
            .then(() => Promise.resolve());
    });
}

startDay();

function height(): Promise<number> {
    return get(url('/blocks/height'))
        .then((response: Response & { body: { height: number } }) => response.body.height);
}

function isGameInBlockchain(game: Game): Promise<Game | null> {
    return get(url(`/addresses/data/${address}/${encodeURIComponent(game.time)}`))
        .then(() => null)
        .catch(() => game);
}
