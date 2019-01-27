export class Game {

    public readonly timestamp: number;
    public readonly result: number;

    constructor(timestamp: number, result: number) {
        this.timestamp = timestamp;
        this.result = result;
    }
}
