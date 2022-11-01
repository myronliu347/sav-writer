/// <reference types="node" />
/// <reference types="node" />
import * as fs from 'fs';
import * as variables from './variables';
export declare function variablesToBuffer(vars: any, length: any, options?: {
    bias: number;
}): Buffer;
export declare function recordsToBuffer(recs: any, vars: any, options?: {
    bias: number;
}): Buffer;
export interface WriteStreamOptions {
    variables: variables.SavVariable[];
    length: number;
    path: fs.PathLike;
}
export declare class WriteStream {
    stream: fs.WriteStream;
    options: WriteStreamOptions;
    _sendVars: boolean;
    constructor(options: WriteStreamOptions);
    end(): Promise<(resolve: any) => void>;
    write(records: any[]): void;
}
