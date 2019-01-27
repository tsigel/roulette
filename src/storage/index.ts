import { Game } from '../models/game';


const storage = Object.create(null);

export function getGameList(date: number): Array<Game> {
    return storage[date] || [];
}

export function setGameList(date: number, list: Array<Game>) {
    storage[date] = list;
}

