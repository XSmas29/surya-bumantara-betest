"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    identityNumber: {
        type: Number,
        required: true,
        unique: true,
    },
});
const User = mongoose_1.default.model("user", schema);
exports.default = User;
//# sourceMappingURL=model.js.map