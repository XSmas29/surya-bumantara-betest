"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRedisCLient = void 0;
const redis_1 = require("redis");
const getRedisCLient = () => {
    const client = (0, redis_1.createClient)({ url: "redis://redis:6379" });
    client.on("error", (error) => {
        console.error(error);
    });
    client.connect();
    return client;
};
exports.getRedisCLient = getRedisCLient;
//# sourceMappingURL=index.js.map