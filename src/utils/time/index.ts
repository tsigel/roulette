import { GAME_INTERVAL } from '../../constants';

export function toDate(date: number | Date): Date {
    return typeof date === 'number' ? new Date(date) : date;
}

export function getGamesCount(): number {
    return Math.floor(1000 * 60 * 60 * 24 / GAME_INTERVAL);
}

export function getNextGame(some: Date | number = Date.now()): { time: number, index: number } {
    const date = toDate(some);
    const startOfDate = new Date(date.getTime());
    startOfDate.setHours(0, 0, 0, 0);
    const diff = date.getTime() - startOfDate.getTime();
    const factor = (Math.floor((diff - 1) / GAME_INTERVAL) + 1);
    return { time: GAME_INTERVAL * factor + startOfDate.getTime(), index: factor };
}

export function startOfDate(some: Date | number): number {
    const date = toDate(some);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
}
