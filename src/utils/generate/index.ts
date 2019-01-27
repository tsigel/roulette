import { ROULETTE_COUNT } from '../../constants';
import { randomBytes } from 'crypto';


const getRandom = getRandomIntFacrory(0, ROULETTE_COUNT);

export function generate(): Promise<number> {
    return random();
}

const random = () => new Promise<number>(resolve => {
    randomBytes(8, function (ex, buffer) {
        var hex = buffer.toString('hex');
        var integer = parseInt(hex, 16);
        var random = integer / 0xffffffffffffffff;

        resolve(getRandom(random));
    });
});

function getRandomIntFacrory(min: number, max: number) {
    return (random: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(random * (max - min + 1)) + min;
    }
}
