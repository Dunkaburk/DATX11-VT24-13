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
exports.addTask = void 0;
const prisma_1 = require("./prisma");
function addTask(title, description, code, solution, level, moduleNames) {
    return __awaiter(this, void 0, void 0, function* () {
        /*const modules = []
        for (const moduleName of moduleNames) {
            modules.push({name: moduleName})
        }*/
        yield prisma_1.prisma.task.create({
            data: {
                title: title,
                description: description,
                code: code,
                solution: solution,
                level: level,
                modules: {
                    //connect: moduleNames.map(name => ({name}))
                    connect: [{ name: "Module1" }]
                }
            }
        });
    });
}
exports.addTask = addTask;
