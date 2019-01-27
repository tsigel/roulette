import { generate, getGamesCount, getNextGame } from './utils';
import { Game } from './models';
import { GAME_INTERVAL } from './constants';
import { setGameList } from './storage';

export * from './cell';
export * from './utils';
export * from './constants';
export * from './storage';
export * from './models';

export function createGameList(start: number): Promise<void> {
    const date = start ? new Date(start) : new Date();
    date.setHours(0, 0, 0, 0);
    const nextGameData = getNextGame(Date.now());
    const gamesCount = getGamesCount();
    let time = nextGameData.time;
    const list = [];
    for (let i = nextGameData.index; i < gamesCount; i++) {
        list.push(time);
        time += GAME_INTERVAL;

    }
    console.log(gamesCount, nextGameData.index);
    const promiseList = list.map(time => generate().then(result => new Game(time, result)));
    return Promise.all(promiseList)
        .then(list => setGameList(date.getTime(), list));
}
