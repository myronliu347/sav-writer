"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriteStream = exports.recordsToBuffer = exports.variablesToBuffer = void 0;
const fs = require("fs");
const records = require("./records");
const variables = require("./variables");
const utilities_1 = require("../utilities");
function variablesToBuffer(vars, length, options = { bias: 100 }) {
    return utilities_1.buffer.write(variables.toArray(vars, length, options));
}
exports.variablesToBuffer = variablesToBuffer;
function recordsToBuffer(recs, vars, options = { bias: 100 }) {
    return utilities_1.buffer.write(records.toArray(recs, vars, options));
}
exports.recordsToBuffer = recordsToBuffer;
class WriteStream {
    constructor(options) {
        const { path } = options;
        this.stream = fs.createWriteStream(path);
        this._sendVars = false;
    }
    end() {
        return Promise.resolve((resolve) => {
            this.stream.end(resolve);
        });
    }
    write(records) {
        const { variables, length } = this.options;
        if (!this._sendVars) {
            this.stream.write(variablesToBuffer(variables, length, { bias: 100 }));
            this._sendVars = true;
        }
        this.stream.write(recordsToBuffer(records, variables, { bias: 100 }));
    }
}
exports.WriteStream = WriteStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3dyaXRlci9zdHJlYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseUJBQXlCO0FBQ3pCLHFDQUFxQztBQUNyQyx5Q0FBeUM7QUFDekMsNENBQXNDO0FBRXRDLFNBQWdCLGlCQUFpQixDQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUN0RSxPQUFPLGtCQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLENBQUM7QUFGRCw4Q0FFQztBQUVELFNBQWdCLGVBQWUsQ0FBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUU7SUFDbEUsT0FBTyxrQkFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRkQsMENBRUM7QUFPRCxNQUFhLFdBQVc7SUFLdEIsWUFBWSxPQUEyQjtRQUNyQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7SUFHRCxHQUFHO1FBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQWM7UUFDbEIsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBRTNDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25CLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCO1FBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7Q0FDRjtBQTVCRCxrQ0E0QkMifQ==