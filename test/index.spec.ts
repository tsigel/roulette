import { createGameList, getGameList, startOfDate } from '../src';


const time = 1548596684204;


describe('Index file', () => {

    it('Create game list', done => {

        createGameList(time)
            .then(() => {
                const list = getGameList(startOfDate(time));
                console.log(list.length);
            });

    });

});
