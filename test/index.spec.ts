import { createGameList, DAY_LENGTH, GAME_INTERVAL } from '../src';


const time = 1548596684204;


describe('Index file', () => {

    it('Create game list', done => {

        createGameList(time)
            .then(list => {
                const count = Math.floor((DAY_LENGTH / GAME_INTERVAL) - 1);
                expect(list.length).toEqual(count);
                done();
            });

    });

});
