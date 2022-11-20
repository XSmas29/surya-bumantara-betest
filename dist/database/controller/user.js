"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.updateUserByAccountNumber = exports.getUserByAccountNumber = exports.getUserByUsername = exports.getAllUser = exports.createUser = void 0;
const model_1 = __importDefault(require("./../model"));
const mongodb_1 = require("mongodb");
const createUser = (userName, accountNumber, emailAddress, identityNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = new model_1.default({
        userName,
        accountNumber,
        emailAddress,
        identityNumber,
    });
    const userSaved = yield newUser.save();
    return userSaved;
});
exports.createUser = createUser;
const getAllUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield model_1.default.find();
    return users;
});
exports.getAllUser = getAllUser;
const getUserByUsername = (userName) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.default.findOne({
        userName,
    });
    return user;
});
exports.getUserByUsername = getUserByUsername;
const getUserByAccountNumber = (accountNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield model_1.default.findOne({
        accountNumber,
    });
    return user;
});
exports.getUserByAccountNumber = getUserByAccountNumber;
class paramUpdateUser {
}
const updateUserByAccountNumber = (accountNumber, param) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = model_1.default.findOneAndUpdate({
        accountNumber,
    }, param);
    updated.exec();
    return updated;
});
exports.updateUserByAccountNumber = updateUserByAccountNumber;
const updateUserById = (id, param) => __awaiter(void 0, void 0, void 0, function* () {
    const updated = model_1.default.findOneAndUpdate({
        _id: new mongodb_1.ObjectId(id),
    }, param);
    return updated;
});
exports.updateUserById = updateUserById;
//# sourceMappingURL=user.js.map