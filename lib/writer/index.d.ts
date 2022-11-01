import { alignments as VariableAlignment, measures as VariableMeasure, types as VariableType, SavVariable } from './variables';
import { WriteStream, WriteStreamOptions } from './stream';
export declare function saveToFile(path: string, recs: Array<{
    [key: string]: any;
}>, vars: SavVariable[]): void;
export declare function createStream(options: WriteStreamOptions): WriteStream;
export { VariableAlignment, VariableMeasure, VariableType, SavVariable, };
