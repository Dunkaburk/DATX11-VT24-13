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
const moduleService_1 = require("../services/moduleService");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const moduleRouter = (0, express_1.Router)();
moduleRouter.get("/getModules", jsonParser, (req, res) => {
    (0, moduleService_1.getModules)()
        .then((modules) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(modules).status(200).send();
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        res.status(500).send("An error occured. Check terminal.");
    }))
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$disconnect();
    }));
});
//Returns a list with id and name of each task in a module
moduleRouter.get("/getModuleTasks", jsonParser, (req, res) => {
    const data = req.body;
    const id = data.id;
    const module = data.module;
    if (!module || !id) {
        res.status(404).send(`An error occured while trying to fetch tasks: Missing information.
					Following values were received:
				 	id = ${id}, name = ${module}`);
        return;
    }
    (0, moduleService_1.getModuleTasks)(module)
        .then(result => {
        console.log(result);
        res.json(result.tasks).status(200).send("fetched stuff");
    })
        .catch((e) => {
        console.error(e);
        res.status(500).send("An error occured. Check terminal.");
    })
        .finally(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$disconnect();
    }));
});
moduleRouter.post("/addModule", jsonParser, (req, res) => {
    const name = req.body.name;
    if (!name) {
        res.status(404).send(`An error occured while trying to add user: Missing module name.`);
        return;
    }
    (0, moduleService_1.addModule)(name)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$disconnect();
        res.status(200).send();
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        var errorMessage = "An error occured while trying to add module: ";
        if (e.code === 'P2002')
            errorMessage += "A module already exists with this name.";
        yield prisma_1.prisma.$disconnect();
        console.error(errorMessage);
        res.status(500).send(errorMessage);
    }));
});
exports.default = moduleRouter;
