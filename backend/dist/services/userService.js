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
exports.addUser = exports.getAllStudents = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = require("./prisma");
function getAllStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield prisma_1.prisma.user.findMany({
            where: {
                role: client_1.Role.STUDENT
            }
        });
    });
}
exports.getAllStudents = getAllStudents;
function addUser(id, name, course, role) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma_1.prisma.user.create({
            data: {
                id: id,
                name: name,
                course: course,
                role: role
            }
        });
    });
}
exports.addUser = addUser;
