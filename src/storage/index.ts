import { Game } from '../models/game';
import { readJSON, outputJSON } from 'fs-extra';
import { join } from 'path';


export interface IStorage<T> {
    get<K extends keyof T>(key: K): Promise<T[K]>;

    set<K extends keyof T>(key: K, value: T[K]): Promise<void>;

    set<K extends keyof T>(key: K): (value: T[K]) => Promise<void>;
}

const path = (key: string) => join(process.cwd(), 'storageDist', `${key.replace(/\./g, '-')}.json`);

export class Storage<T> implements IStorage<Record<string, Array<Game>>> {

    get(key: string): Promise<Array<Game>> {
        return readJSON(path(key))
            .then(list => list.map((item: Game) => new Game(item.time, item.result)))
            .catch(() => []);
    }

    set(key: string, list?: Array<Game>): any {
        if (arguments.length > 1) {
            return outputJSON(path(key), list);
        } else {
            return (value: Array<Game>) => outputJSON(path(key), value);
        }
    }

}
