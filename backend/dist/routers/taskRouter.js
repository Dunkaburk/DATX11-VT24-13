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
const express_1 = require("express");
const prisma_1 = require("../services/prisma");
const taskService_1 = require("../services/taskService");
const client_1 = require("@prisma/client");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const taskRouter = (0, express_1.Router)();
taskRouter.get("/next", (req, res) => { res.status(501).send("OoOps, not implemented"); });
taskRouter.get("/previous", (req, res) => { res.status(501).send("OoOps, not implemented"); });
taskRouter.post("/submit", (req, res) => { res.status(501).send("OoOps, not implemented"); });
taskRouter.get("/:err", (req, res) => { res.status(404).send(); });
taskRouter.post("/addTask", jsonParser, (req, res) => {
    const data = req.body;
    const title = data.title ? data.title : null;
    const description = data.description ? data.description : null;
    const code = data.code ? data.code : null;
    const solution = data.solution ? data.solution : null;
    const level = data.level ? data.level : null;
    const modules = data.modules ? data.modules : null;
    if (!title || !description || !code || !solution || !level) {
        res.status(404).send(`An error occured while trying to add user: Missing information.
					Following values were received:
				 	title = ${title}, description = ${description}, code = ${code}, solution = ${solution}, level = ${level}`);
        return;
    }
    if (!isValidLevel(level)) {
        res.status(404).send("Invalid level sent.");
        return;
    }
    (0, taskService_1.addTask)(title, description, code, solution, level, modules)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        res.status(200).send("Task added");
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(e);
        var errorMessage = "An error occured while trying to add user: ";
        if (e.code === 'P2025')
            errorMessage += "a connected record was not found. Probably faulty module name.";
        res.status(500).send(errorMessage + " Check terminal for more information.");
    }))
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$disconnect();
    }));
});
function isValidLevel(level) {
    return Object.values(client_1.Level).includes(level);
}
exports.default = taskRouter;
