import { ROULETTE_COUNT } from '../../constants';
import { randomBytes } from 'crypto';


const getRandom = getRandomIntFactory(0, ROULETTE_COUNT);

export function generate(): Promise<number> {
    return random();
}

const random = () => new Promise<number>(resolve => {
    randomBytes(8, function (ex, buffer) {
        const hex = buffer.toString('hex');
        const integer = parseInt(hex, 16);
        const random = integer / 0xffffffffffffffff;

        resolve(getRandom(random));
    });
});

function getRandomIntFactory(min: number, max: number) {
    return (random: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(random * (max - min + 1)) + min;
    }
}
