import { Game } from '../models/game';
import { readJSON, outputJSON } from 'fs-extra';
import { join } from 'path';


export interface IStorage<T> {
    get<K extends keyof T>(key: K): Promise<T[K]>;

    set<K extends keyof T>(key: K, value: T[K]): Promise<void>;

    set<K extends keyof T>(key: K): (value: T[K]) => Promise<void>;
}

const path = (key: number) => join(process.cwd(), 'storageDist', `${String(key)}.json`);

export class Storage implements IStorage<Record<number, Array<Game>>> {

    _storage: Record<number, Array<Game>> = Object.create(null);

    get(key: number): Promise<Array<Game>> {
        return this._storage[key] ? Promise.resolve(this._storage[key]) : readJSON(path(key))
            .then(list => list.map((item: Game) => new Game(item.time, item.result)))
            .catch(() => []);
    }

    set(key: number, list?: Array<Game>): any {

        const set = (key: number, list: Array<Game>) => {
            this._storage[key] = list;
            return outputJSON(path(key), list);
        };

        if (list) {
            return set(key, list);
        } else {
            return (list: Array<Game>) => set(key, list);
        }
    }

}
