import { GAME_INTERVAL } from './constants';
import { generate, getStartOfDay, isNotEmpty, isTheSameDay, map, sign, tap, toBase58, wait } from './utils/';
import { Game } from './models';
import { get, post, Response } from 'superagent';
import { data } from 'waves-transactions';
import { Storage } from './storage';
import { libs, Seed } from '@waves/signature-generator';
import { CELLS } from './cell';
import { splitEvery, path } from 'ramda';

export * from './cell';
export * from './utils';
export * from './constants';
export * from './storage';
export * from './models';


export function createAPI({ storage, seed, node, extraFee }: IParams) {

    const url = (path: string): string => `${node}${path}`;
    const { address, phrase } = seed;
    const signKey = (date: number) => `${date} result signature`;
    let lastGameTime: number | null = null;

    const checkSignature = (date: number) => (list: Array<Game>) =>
        get(url(`/addresses/data/${address}/${encodeURIComponent(signKey(date))}`))
            .then(() => list);

    const addSignature = (date: number) => (list: Array<Game>) => sign(list.map(game => game.result), seed)
        .then(signature => {
            return post(url('/transactions/broadcast'))
                .retry(3)
                .send(data({ data: [{ key: signKey(date), type: 'string', value: signature }], additionalFee: extraFee, timestamp: date }, phrase))
                .then(response => waitTransaction(response.body))
                .then(tap(() => console.log('Success broadcast signature!')))
                .then(() => list)
                .catch(catchError);
        });

    function startDay(date: number): Promise<Array<Game>> {
        console.log(`Start of day ${date}`);
        return getOrCreateStorageList(storage, date)
            .then(list => checkSignature(date)(list)
                .catch(() => addSignature(date)(list)));
    }

    const liveLoop = (date: number) => {
        const time = Date.now();

        if (!isTheSameDay(time, date)) {
            return Promise.reject(new Error('Wrong date!'));
        }

        return storage.get(date)
            .then(list => {
                if (!lastGameTime) {
                    return list.filter(game => time > game.time);
                }
                const nextGameTime = lastGameTime + GAME_INTERVAL;
                return list.filter(game => nextGameTime - GAME_INTERVAL * 3 < game.time && game.time < time);
            })
            .then(tap(list => (lastGameTime = list.length ? list[list.length - 1].time : lastGameTime)))
            .then(sendList);
    };

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
                    data: dataEntries,
                    additionalFee: extraFee
                }, seed.phrase);

                return post(url('/transactions/broadcast'))
                    .retry(3)
                    .send(tx)
                    .then(() => waitTransaction(tx))
                    .catch(catchError);
            })(splitEvery(33, list)).then(() => Promise.resolve());
        });
    }

    function waitTransaction(tx: { id: string }): Promise<void> {
        return wait(1000)
            .then(() => get(url(`/transactions/unconfirmed/info/${tx.id}`)))
            .then(() => waitTransaction(tx))
            .catch(() => get(url(`/transactions/info/${tx.id}`)))
            .then(() => Promise.resolve())
            .catch(() => waitTransaction(tx));
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

    function catchError(e: any) {
        lastGameTime = null;

        console.error('Request Error!');
        console.error('Status: ', path(['status'], e));
        console.error('Method: ', path(['response', 'req', 'method'], e));
        console.error('Url: ', path(['response', 'req', 'url'], e));

        const message = tryToParseMessage(e);

        if (message) {
            console.error('Message: ' + message);
        }

        return Promise.reject(e);
    }

    function tryToParseMessage(error: any): string | null {
        try {
            return JSON.parse(path(['response', 'text'], error) as string).message || null;
        } catch (e) {
            return null;
        }
    }

    return { startDay, liveLoop };
}

export function createGameList(start?: number): Promise<Array<Game>> {
    const now = getStartOfDay(start);
    let time = now + GAME_INTERVAL;
    const dateList = [];

    do {
        dateList.push(time);
        time = time + GAME_INTERVAL;
    } while (isTheSameDay(time, now));

    const promiseList = dateList.map(date => generate().then(result => new Game(date, result)));
    return Promise.all(promiseList);
}

function getOrCreateStorageList(storage: Storage, date: number): Promise<Array<Game>> {
    return storage.get(date)
        .then(list => {
            return list.length ? list : setStorageList(storage, date);
        });
}

function setStorageList(storage: Storage, date: number): Promise<Array<Game>> {
    return createGameList().then(tap(storage.set(date)));
}

export interface IParams {
    storage: Storage;
    seed: Seed;
    node: string;
    extraFee: number;
}

