import { CELLS } from '../../src';

describe('Check cell generation', () => {

    it('Check cell 0', () => {
        expect(CELLS[0]).toEqual({
            isEven: false,
            isOdd: false,
            isRed: false,
            isBlack: false,
            isFirstHalf: false,
            isLastHalf: false,
            isFirstLine: false,
            isMiddleLine: false,
            isLastLine: false,
            isFirstThird: false,
            isMiddleThird: false,
            isLastThird: false,
            result: 0
        });
    });

    it('Check cell 1', () => {
        expect(CELLS[1]).toEqual({
            isEven: false,
            isOdd: true,
            isRed: true,
            isBlack: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstLine: false,
            isMiddleLine: false,
            isLastLine: true,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 1
        });
    });

    it('Check cell 2', () => {
        expect(CELLS[2]).toEqual({
            isEven: true,
            isOdd: false,
            isRed: false,
            isBlack: true,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstLine: false,
            isMiddleLine: true,
            isLastLine: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 2
        });
    });

    it('Check cell 3', () => {
        expect(CELLS[3]).toEqual({
            isEven: false,
            isOdd: true,
            isRed: true,
            isBlack: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstLine: true,
            isMiddleLine: false,
            isLastLine: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 3
        });
    });

    it('Check cell 4', () => {
        expect(CELLS[4]).toEqual({
            isEven: true,
            isOdd: false,
            isRed: false,
            isBlack: true,
            isFirstLine: false,
            isMiddleLine: false,
            isLastLine: true,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 4
        });
    });
    it('Check cell 5', () => {
        expect(CELLS[5]).toEqual({
            isEven: false,
            isOdd: true,
            isRed: true,
            isBlack: false,
            isFirstLine: false,
            isMiddleLine: true,
            isLastLine: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 5
        });
    });
    it('Check cell 6', () => {
        expect(CELLS[6]).toEqual({
            isEven: true,
            isOdd: false,
            isRed: false,
            isBlack: true,
            isFirstLine: true,
            isMiddleLine: false,
            isLastLine: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 6
        });
    });
    it('Check cell 8', () => {
        expect(CELLS[8]).toEqual({
            isEven: true,
            isOdd: false,
            isRed: false,
            isBlack: true,
            isFirstLine: false,
            isMiddleLine: true,
            isLastLine: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 8
        });
    });
    it('Check cell 9', () => {
        expect(CELLS[9]).toEqual({
            isEven: false,
            isOdd: true,
            isRed: true,
            isBlack: false,
            isFirstLine: true,
            isMiddleLine: false,
            isLastLine: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 9
        });
    });
    it('Check cell 10', () => {
        expect(CELLS[10]).toEqual({
            isEven: true,
            isOdd: false,
            isRed: false,
            isBlack: true,
            isFirstLine: false,
            isMiddleLine: false,
            isLastLine: true,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 10
        });
    });
    it('Check cell 11', () => {
        expect(CELLS[11]).toEqual({
            isEven: false,
            isOdd: true,
            isRed: false,
            isBlack: true,
            isFirstLine: false,
            isMiddleLine: true,
            isLastLine: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 11
        });
    });
    it('Check cell 12', () => {
        expect(CELLS[12]).toEqual({
            isEven: true,
            isOdd: false,
            isRed: true,
            isBlack: false,
            isFirstLine: true,
            isMiddleLine: false,
            isLastLine: false,
            isFirstHalf: true,
            isLastHalf: false,
            isFirstThird: true,
            isMiddleThird: false,
            isLastThird: false,
            result: 12
        });
    });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });
    // it('Check cell 7', () => {
    //     expect(CELLS[7]).toEqual({
    //         isEven: false,
    //         isOdd: true,
    //         isRed: true,
    //         isBlack: false,
    //         isFirstLine: false,
    //         isMiddleLine: false,
    //         isLastLine: true,
    //         isFirstHalf: true,
    //         isLastHalf: false,
    //         isFirstThird: true,
    //         isMiddleThird: false,
    //         isLastThird: false,
    //         result: 7
    //     });
    // });

});