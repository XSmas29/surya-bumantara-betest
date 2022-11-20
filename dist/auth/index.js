"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = exports.createToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const secret = process.env.JWT_SECRET || "5d0f7a27fe8a66efe169db0023307a234a54f0630d20f2df35258f9b427e29f74bba7caec56fe8d328a939d14c64df39748bf46ab778f73053549901c6198e4c";
const createToken = (user) => {
    const token = (0, jsonwebtoken_1.sign)(user, secret, {
        expiresIn: '24h',
    });
    return token;
};
exports.createToken = createToken;
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log(req.headers);
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        res.sendStatus(401);
    else {
        (0, jsonwebtoken_1.verify)(token, secret, (err, user) => {
            console.log(err);
            if (err)
                return res.sendStatus(403);
            next();
        });
    }
};
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=index.js.map