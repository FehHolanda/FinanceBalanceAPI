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
const dotenv_1 = require("dotenv");
const mongo_1 = require("./database/mongo");
const routes_1 = require("./routes");
const TranslationsYup_1 = require("./shared/services/TranslationsYup");
const cors_1 = __importDefault(require("cors"));
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (0, dotenv_1.config)();
    (0, TranslationsYup_1.SetLocale)();
    const server = (0, express_1.default)();
    const port = process.env.PORT || 8000;
    server.use((0, cors_1.default)({
        origin: ((_a = process.env.ENABLE_CORS) === null || _a === void 0 ? void 0 : _a.split(";")) || [],
    }));
    server.use(express_1.default.json(), routes_1.router);
    yield mongo_1.MongoClient.connect();
    server.listen(port, () => console.log(`listening on port ${port}!`));
});
main();
