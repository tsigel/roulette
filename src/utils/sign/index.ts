import { Seed, generate, Int, ByteProcessor, utils, StringWithLength } from '@waves/signature-generator';
import { Game } from '../../models/game';


class ListProcessor extends ByteProcessor {

    constructor(name: string) {
        super(name);
    }

    public process(value: Array<Game>): Promise<Uint8Array> {
        return new Int('', 2).process(value.length).then(bytes => {
            const promiseList = value.map(game => Promise.all([
                new StringWithLength('').process(game.salt),
                new Int('', 1).process(game.result)
            ]).then(([salt, result]) => utils.concatUint8Arrays(salt, result)));
            return Promise.all(promiseList).then(byteList => {
                return utils.concatUint8Arrays(bytes, ...byteList);
            });
        });
    }
}

export const Generator = generate<{ list: Array<Game> }>([
    new ListProcessor('list')
]);


export function sign(list: Array<Game>, seed: Seed): Promise<string> {
    return new Generator({ list }).getSignature(seed.keyPair.privateKey);
}
