import { utils, libs } from '@waves/signature-generator';
import * as moment from 'moment';

export * from './sign';
export * from './generate';
export * from './time';

export function tap<T>(callback: (data: T) => any): (data: T) => T {
    return (data: T) => {
        callback(data);
        return data;
    };
}

export function isNotEmpty<T>(some: T | null): some is T {
    return some != null;
}

export function wait(time: number): Promise<void> {
    return new Promise<void>(resolve => setTimeout(resolve, time));
}

export function map<T, R>(cb: (data: T) => Promise<R>): (list: Array<T>) => Promise<Array<R>> {
    return (list: Array<T>) => new Promise((resolve, reject) => {
        const result: Array<R> = [];
        let index = 0;

        const loop = () => {
            if (result.length === list.length) {
                return resolve(result);
            }
            cb(list[index]).then((data) => {
                index++;
                result.push(data);
                loop();
            }, reject);
        };

        loop();
    });
}

export function toBase58(data: string): string {
    return libs.base58.encode(utils.convert.stringToByteArray(data) as any);
}

export function getStartOfDay(time?: number): number {
    return moment(moment(time).startOf('day').toDate().getTime() - new Date().getTimezoneOffset() * 60 * 1000).toDate().getTime();
}

export function isTheSameDay(time?: number): boolean {
    return getStartOfDay(time) === getStartOfDay();
}
