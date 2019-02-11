import { data, broadcast } from '@waves/waves-transactions';
import { TypelessDataEntry } from '@waves/waves-transactions/dist/transactions/data';
import { DataEntry } from '@waves/waves-transactions/dist/transactions';
import { Seed } from '@waves/signature-generator';


export function sendData(node: string, entries: Array<DataEntry | TypelessDataEntry>, seed: Seed, timestamp: number = Date.now()) {
    const tx = data({ data: entries, timestamp }, seed.phrase);
    return broadcast(tx, node);
}
