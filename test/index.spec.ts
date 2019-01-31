import { createGameList, GAME_INTERVAL } from '../src';


const time = 1548596684204;


describe('Index file', () => {

    it('Create game list', done => {

        createGameList(time)
            .then((list) => {
                const count = Math.floor(1000 * 60 * 60 * 24 / GAME_INTERVAL);
                expect(list.length).toBe(count);
            });

    });

});
