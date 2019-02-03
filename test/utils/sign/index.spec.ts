import { Seed, utils } from '@waves/signature-generator';
import { sign, Generator } from '../../../src';


describe('Sign', () => {

    it('Check get bytes from list of number', done => {

        const list = [2, 15, 6, 33, 23, 12, 2];
        new Generator({ list }).getBytes().then(bytes => {
            const result = [
                ...[0, list.length],
                ...list
            ];
            expect(bytes).toEqual(Uint8Array.from(result));
            done();
        });
    });

    it('Check generate signature', done => {

        const list = [2, 15, 6, 33, 23, 12, 2];
        const seed = Seed.create();

        Promise.all([
            new Generator({ list }).getBytes(),
            sign(list, seed)
        ]).then(([bytes, signature]) => {
            expect(utils.crypto.isValidSignature(bytes, signature, seed.keyPair.publicKey)).toBe(true);
            done();
        });
    });

});
