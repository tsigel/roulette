export class Game {

    public readonly time: number;
    public readonly result: number;
    public readonly salt: string;

    constructor(date: number, result: number, salt: string) {
        this.time = date;
        this.result = result;
        this.salt = salt;
    }

}
