import { Seed, utils } from '@waves/signature-generator';
import { sign, Generator } from '../../../src';

const list = [
    { time: 0, salt: 'test', result: 12 },
    { time: 0, salt: 'test-2', result: 15 }
];

const seed = Seed.create();

describe('Sign', () => {

    it('Check get bytes from list of number', done => {

        const targetBytes = Uint8Array.from([
            0, 2, 0, 4, 116, 101, 115, 116, 12, 0, 6, 116, 101, 115, 116, 45, 50, 15
        ]);

        new Generator({ list }).getBytes().then(bytes => {
            expect(bytes).toEqual(targetBytes);
            done();
        });
    });

    it('Check generate signature', done => {


        Promise.all([
            new Generator({ list }).getBytes(),
            sign(list, seed)
        ]).then(([bytes, signature]) => {
            expect(utils.crypto.isValidSignature(bytes, signature, seed.keyPair.publicKey)).toBe(true);
            done();
        });
    });

});
