"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VariableType = exports.VariableMeasure = exports.VariableAlignment = exports.createStream = exports.saveToFile = void 0;
const fs = require("fs");
const records = require("./records");
const variables = require("./variables");
const utilities_1 = require("../utilities");
const variables_1 = require("./variables");
Object.defineProperty(exports, "VariableAlignment", { enumerable: true, get: function () { return variables_1.alignments; } });
Object.defineProperty(exports, "VariableMeasure", { enumerable: true, get: function () { return variables_1.measures; } });
Object.defineProperty(exports, "VariableType", { enumerable: true, get: function () { return variables_1.types; } });
const stream_1 = require("./stream");
function saveToFile(path, recs, vars) {
    const data = utilities_1.buffer.write([
        variables.toArray(vars, recs.length, { bias: 100 }),
        records.toArray(recs, vars, { bias: 100 }),
    ].flat());
    fs.writeFileSync(path, data);
}
exports.saveToFile = saveToFile;
function createStream(options) {
    return new stream_1.WriteStream(options);
}
exports.createStream = createStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvd3JpdGVyL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlCQUF5QjtBQUN6QixxQ0FBcUM7QUFDckMseUNBQXlDO0FBQ3pDLDRDQUFzQztBQUN0QywyQ0FLcUI7QUFpQm5CLGtHQXJCYyxzQkFBaUIsT0FxQmQ7QUFDakIsZ0dBckJZLG9CQUFlLE9BcUJaO0FBQ2YsNkZBckJTLGlCQUFZLE9BcUJUO0FBbEJkLHFDQUEyRDtBQUUzRCxTQUFnQixVQUFVLENBQUMsSUFBWSxFQUFFLElBQW1DLEVBQUUsSUFBbUI7SUFDL0YsTUFBTSxJQUFJLEdBQUcsa0JBQU0sQ0FBQyxLQUFLLENBQUM7UUFDeEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNuRCxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDM0MsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRVYsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQztBQVBELGdDQU9DO0FBRUQsU0FBZ0IsWUFBWSxDQUFDLE9BQTJCO0lBQ3RELE9BQU8sSUFBSSxvQkFBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2xDLENBQUM7QUFGRCxvQ0FFQyJ9