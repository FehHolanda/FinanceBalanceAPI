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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserController = void 0;
const http_status_codes_1 = require("http-status-codes");
class UpdateUserController {
    constructor(updateUserRepository) {
        this.updateUserRepository = updateUserRepository;
    }
    handle(httpRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(httpRequest.body);
            try {
                if (!httpRequest.body)
                    return {
                        statusCode: http_status_codes_1.StatusCodes.BAD_REQUEST,
                        body: "need a id",
                    };
                const user = yield this.updateUserRepository.updateUser(httpRequest.body);
                return {
                    statusCode: http_status_codes_1.StatusCodes.OK,
                    body: user,
                };
            }
            catch (error) {
                return {
                    statusCode: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
                    body: error.message,
                };
            }
        });
    }
}
exports.UpdateUserController = UpdateUserController;