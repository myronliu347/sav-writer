import * as fs from 'fs';
import * as records from './records';
import * as variables from './variables';
import { buffer } from '../utilities';
import {
  alignments as VariableAlignment,
  measures as VariableMeasure,
  types as VariableType,
  SavVariable,
} from './variables';
import { WriteStream, WriteStreamOptions } from './stream';

export function saveToFile(path: string, recs: Array<{ [key: string]: any }>, vars: SavVariable[]) {
  const data = buffer.write([
    variables.toArray(vars, recs.length, { bias: 100 }),
    records.toArray(recs, vars, { bias: 100 }),
  ].flat());

  fs.writeFileSync(path, data);
}

export function createStream(options: WriteStreamOptions) {
  return new WriteStream(options);
}

export {
  VariableAlignment,
  VariableMeasure,
  VariableType,
  SavVariable,
}
