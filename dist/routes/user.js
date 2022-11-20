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
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../database/model"));
const user_1 = require("../database/controller/user");
const mongoose_1 = require("mongoose");
const mongodb_1 = require("mongodb");
const index_1 = require("../redis/index");
const router = express_1.default.Router();
const redisClient = (0, index_1.getRedisCLient)();
const expirationTime = +(process.env.REDIS_EXPIRATION_TIME || 300);
router.post("/", (req, res) => {
    const { userName, accountNumber, emailAddress, identityNumber } = req.body;
    (0, user_1.createUser)(userName, accountNumber, emailAddress, identityNumber).then(() => {
        res.send("Berhasil Add User");
    }).catch(err => {
        res.send(err.message);
    });
});
router.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield redisClient.get("users").catch(err => console.log(err));
    if (users) {
        res.send(JSON.parse(users));
    }
    else {
        (0, user_1.getAllUser)().then((users) => {
            redisClient.SETEX("users", expirationTime, JSON.stringify(users));
            res.send(users);
        }).catch(err => {
            res.send(err.message);
        });
    }
}));
router.route("/:id")
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    console.log((0, mongoose_1.isValidObjectId)(id));
    if (!(0, mongoose_1.isValidObjectId)(id))
        res.status(400).send("Invalid ID");
    else {
        const user = yield model_1.default.findOne({ _id: new mongodb_1.ObjectId(id) });
        if (!user)
            res.status(404).send("User not found");
        else {
            const { userName, accountNumber, emailAddress, identityNumber } = req.body;
            (0, user_1.updateUserById)(id, { userName, accountNumber, emailAddress, identityNumber }).then(() => {
                res.send("Berhasil update user");
            }).catch(err => {
                res.send(err.message);
            });
        }
    }
}));
router.route("/username/:userName")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.params;
    const user = yield redisClient.get(`username:${userName}`).catch(err => console.log(err));
    if (user) {
        res.send(JSON.parse(user));
    }
    else {
        (0, user_1.getUserByUsername)(userName).then(user => {
            if (!user)
                res.status(404).send("User not found");
            else {
                redisClient.SETEX(`username:${userName}`, expirationTime, JSON.stringify(user));
                res.send(user);
            }
        }).catch(err => {
            res.send(err.message);
        });
    }
}))
    // .put(async (req, res) => {
    //   const { userName } = req.params;
    //   const user = await User.findOne({userName})
    //   if (!user) res.status(404).send("User not found");
    //   else {
    //     user.updateOne(req.body, { runValidators: true, }, err => {
    //       if (err) res.send(err.message);
    //       else res.send("Berhasil Update User");
    //     })
    //   }
    // })
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName } = req.params;
    const user = yield model_1.default.findOne({ userName });
    if (!user)
        res.status(404).send("User not found");
    else {
        user.deleteOne(err => {
            if (err)
                res.send(err.message);
            else
                res.send("Berhasil Delete User");
        });
    }
}));
router.route("/accountNumber/:accountNumber")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountNumber } = req.params;
    const user = yield redisClient.get(`accountnumber:${accountNumber}`).catch(err => console.log(err));
    if (user) {
        res.send(JSON.parse(user));
    }
    else {
        (0, user_1.getUserByAccountNumber)(+accountNumber).then(user => {
            if (!user)
                res.status(404).send("User not found");
            else {
                redisClient.SETEX(`accountnumber:${accountNumber}`, expirationTime, JSON.stringify(user));
                res.send(user);
            }
        }).catch(err => {
            res.send(err.message);
        });
    }
}))
    // .put(async (req, res) => {
    //   const { accountNumber } = req.params;
    //   const user = await User.findOne({accountNumber})
    //   if (!user) res.status(404).send("User not found");
    //   else {
    //     user.updateOne(req.body, { runValidators: true, }, err => {
    //       if (err) res.send(err.message);
    //       else res.send("Berhasil Update User");
    //     })
    //   }
    // })
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountNumber } = req.params;
    const user = yield model_1.default.findOne({ accountNumber });
    if (!user)
        res.status(404).send("User not found");
    else {
        user.deleteOne(err => {
            if (err)
                res.send(err.message);
            else
                res.send("Berhasil Delete User");
        });
    }
}));
exports.default = router;
//# sourceMappingURL=user.js.map