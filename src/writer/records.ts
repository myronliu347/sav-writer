import * as moment from 'moment';
import { BufferType } from '../utilities';
import { types as VariableType } from './variables';


export function toArray(records, variables, { bias }) {
  const array = [];
  const data = [];
  records.forEach((record) => {
    variables.forEach((variable) => {
      switch (variable.type) { // eslint-disable-line default-case
        case VariableType.Date: pushDateTime(data, record[variable.name], 'DD-MM-YYYY'); break;
        case VariableType.DateTime: pushDateTime(data, record[variable.name], 'DD-MM-YYYY HH:mm:SS'); break;
        case VariableType.Numeric: pushNumeric(data, record[variable.name], bias); break;
        case VariableType.String: pushString(data, record[variable.name], variable.width); break;
      }
    });
  });
  for (let i = 0; i < data.length; i += 8) {
    const slice = data.slice(i, i + 8);
    array.push(...slice.map((item) => item.command));
    if (slice.length < 8) array.push(...Array.from({ length: 8 - slice.length }).fill({ type: BufferType.Int8, value: 0 }));
    array.push(...slice.map((item) => item.value).filter((item) => !!item));
  }
  return array;
}

function pushDateTime(data, value, format) {
  const date = moment(value, format);
  if (!date.isValid()) {
    data.push({ command: { type: BufferType.Int8, value: 255 } });
  } else {
    data.push({ command: { type: BufferType.Int8, value: 253 }, value: { type: BufferType.Float, value: date.unix() + 12219379200 } });
  }
}

function pushNumeric(data, value, bias) {
  const number = +value + bias;
  if (isNaN(value)) { // eslint-disable-line no-restricted-globals
    data.push({ command: { type: BufferType.Int8, value: 255 } });
  } else if (Number.isInteger(number) && number > 0 && number < 252) {
    data.push({ command: { type: BufferType.Int8, value: number } });
  } else {
    data.push({ command: { type: BufferType.Int8, value: 253 }, value: { type: BufferType.Float, value } });
  }
}

function pushString(data, value, width) {
  value = (value || '').toString().slice(0, width); // eslint-disable-line no-param-reassign
  const buffer = Buffer.from(value || '', 'utf8').slice(0, width);
  for (let i = 0; i < width; i += 8) {
    const slice = padEnd(buffer.slice(i, i + 8), 8);
    if (slice.toString().trim()) {
      data.push({ command: { type: BufferType.Int8, value: 253 }, value: { type: BufferType.Buffer, value: slice } });
    } else {
      data.push({ command: { type: BufferType.Int8, value: 254 } });
    }
  }
}

function padEnd(buffer, length) {
  if (buffer.length >= length) {
    return buffer;
  }

  let n = length - buffer.length;
  const emptyStrs = [];
  while (n > 0) {
    emptyStrs.push(' ');
    n--;
  }

  return Buffer.concat([ buffer, Buffer.from(emptyStrs.join('')) ]);
}
