"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("./database/connection"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = require("./auth");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connection_1.default)();
const PORT = process.env.PORT || 3030;
app.use('/api/user', auth_1.authenticateToken, user_1.default);
app.get('/token', (req, res) => {
    const token = (0, auth_1.createToken)({ userName: "admin" });
    res.json({ token: token });
});
app.listen(PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map