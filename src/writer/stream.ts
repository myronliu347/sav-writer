import * as fs from 'fs';
import * as records from './records';
import * as variables from './variables';
import { buffer } from '../utilities';

export function variablesToBuffer (vars, length, options = { bias: 100 }) {
  return buffer.write(variables.toArray(vars, length, options));
}

export function recordsToBuffer (recs, vars, options = { bias: 100 }) {
  return buffer.write(records.toArray(recs, vars, options));
}

export interface WriteStreamOptions {
  variables: variables.SavVariable[];
  length: number;
  path: fs.PathLike;
}
export class WriteStream {
  stream: fs.WriteStream;
  options: WriteStreamOptions;
  _sendVars: boolean;

  constructor(options: WriteStreamOptions) {
    const { path } = options;
    this.stream = fs.createWriteStream(path);
    this._sendVars = false;
  }
  

  end() {
    return Promise.resolve((resolve) => {
      this.stream.end(resolve);
    });
  }

  write(records: any[]) {
    const { variables, length } = this.options;

    if (!this._sendVars) {
      this.stream.write(variablesToBuffer(variables, length, { bias: 100 }));
      this._sendVars = true;
    }

    this.stream.write(recordsToBuffer(records, variables, { bias: 100 }));
  }
}