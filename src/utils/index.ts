import { utils, libs } from '@waves/signature-generator';
import { CELLS } from '../cell';

export * from './sign';
export * from './generate';



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
    const date = new Date(time || Date.now());
    date.setUTCHours(0, 0, 0, 0);
    return date.getTime();
}

export function isTheSameDay(time?: number, compareDate?: number): boolean {
    return getStartOfDay(time) === getStartOfDay(compareDate);
}

export function getBetBytes(result: number): Uint8Array {
    const cell = CELLS[result];
    const boolToByte = (value: boolean): number => value ? 1 : 0;
    const bytes = [
        0,
        Number(result),
        boolToByte(cell.isRed),
        boolToByte(cell.isEven),
        boolToByte(cell.isFirstHalf),
        cell.isFirstThird ? 0 : cell.isMiddleThird ? 1 : 2,
        cell.isFirstLine ? 0 : cell.isMiddleLine ? 1 : 2
    ];
    return Uint8Array.from(bytes);
}
