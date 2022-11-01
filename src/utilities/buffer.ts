export enum types {
  Buffer = 'buffer',
  Float = 'float',
  Int8 = 'int8',
  Int32 = 'int32',
  String = 'string',
}

export function write(data) {
  data = Array.isArray(data) ? data : [data];

  return Buffer.concat(data.map((item) => {
    switch (item.type) {
      case types.Buffer: return item.value;
      case types.Float: return writeFloat(item.value);
      case types.Int8: return writeInt8(item.value);
      case types.Int32: return writeInt32(item.value);
      case types.String: return writeString(item.value, item.length);
    }
  }));
}

// PRIVATE METHODS
function writeFloat(value) {
  const buffer = Buffer.alloc(8);
  buffer.writeDoubleLE(value);
  return buffer;
}

function writeInt8(value) {
  const buffer = Buffer.alloc(1);
  buffer.writeUInt8(value);
  return buffer;
}

function writeInt32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeInt32LE(value);
  return buffer;
}

function writeString(value, length) {
  if (length) {
    let byteLen = Buffer.byteLength(value, 'utf8');

    while (byteLen > length) {
      value = value.slice(0, value.length - 1);
      byteLen = Buffer.byteLength(value, 'utf8');
    }

    if(byteLen < length) {
      value = value.padEnd(value.length + (length - byteLen));
    }
  }

  return Buffer.from(value, 'utf8');
}
