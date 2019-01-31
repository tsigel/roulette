import { GAME_INTERVAL } from './constants';
import * as moment from 'moment';
import { generate } from './utils/';
import { Game } from './models';

export * from './cell';
export * from './utils';
export * from './constants';
export * from './storage';
export * from './models';


export function createGameList(start?: number): Promise<Array<Game>> {
    const now = moment(start);
    let time = moment(start).startOf('day');
    const dateList = [];

    do {
        dateList.push(time.toDate().getTime());
        time = moment(time.toDate().getTime() + GAME_INTERVAL);
    } while (time.day() === now.day());

    const promiseList = dateList.map(date => generate().then(result => new Game(date, result)));
    return Promise.all(promiseList);
}

