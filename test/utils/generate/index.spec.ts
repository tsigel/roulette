import { generate, ROULETTE_COUNT } from '../../../src';


describe('Generate game result', () => {

    it('Is random', done => {

        const promises = [];
        for (let i = 500; i--;) {
            const promise = generate()
                .then(result => {
                    expect(result >= 0).toBe(true);
                    expect(result <= ROULETTE_COUNT).toBe(true);
                });

            promises.push(promise);
        }

        Promise.all(promises).then(() => {
            done();
        })
    });

});
