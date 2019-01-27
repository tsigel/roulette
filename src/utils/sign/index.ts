import { Seed, generate, Int, ByteProcessor, utils } from '@waves/signature-generator';


class ListProcessor extends ByteProcessor {

    constructor(name: string) {
        super(name);
    }

    public process(value: Array<number>): Promise<Uint8Array> {
        return new Int('', 2).process(value.length).then(bytes => {
            const promiseList = value.map(result => new Int('', 1).process(result));
            return Promise.all(promiseList).then(byteList => {
                return utils.concatUint8Arrays(bytes, ...byteList);
            })
        });
    }
}

export const Generator = generate<{ list: Array<number> }>([
    new ListProcessor('list')
]);


export function sign(list: Array<number>, seed: Seed): Promise<string> {
    return new Generator({ list }).getSignature(seed.keyPair.privateKey);
}
