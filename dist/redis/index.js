"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisCLient = void 0;
const redis_1 = require("redis");
const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";
const getRedisCLient = () => {
    const client = (0, redis_1.createClient)();
    client.on("error", (error) => {
        console.error(error);
    });
    client.connect();
    return client;
};
exports.getRedisCLient = getRedisCLient;
//# sourceMappingURL=index.js.map