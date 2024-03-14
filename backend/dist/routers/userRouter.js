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
const userService_1 = require("../services/userService");
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
const studentRouter = (0, express_1.Router)();


studentRouter.get("/getAllStudents", (req, res) => {
    (0, userService_1.getAllStudents)()
        .then((students) => __awaiter(void 0, void 0, void 0, function* () {
        res.json(students).status(200).send();
        yield prisma_1.prisma.$disconnect();
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        console.error(e);
        res.status(500).send("An error occured. Check terminal.");
        yield prisma_1.prisma.$disconnect();
    }));
});
studentRouter.post("/addUser", jsonParser, (req, res) => {
    const data = req.body;
    const id = data.id ? data.id : null;
    const name = data.name ? data.name : null;
    const course = data.course ? data.course : null;
    const role = data.role ? data.role : null;
    if (!id || !name || !course || !role) {
        res.status(404).send(`An error occured while trying to add user: Missing information.
					Following values were received:
				 	id = ${id}, name = ${name}, course = ${course}, role = ${role}`);
        return;
    }
    (0, userService_1.addUser)(id, name, course, role)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.$disconnect();
        res.status(200).send();
    }))
        .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
        var errorMessage = "An error occured while trying to add user: ";
        if (e.code === 'P2002')
            errorMessage += "A user already exists with this id.";
        yield prisma_1.prisma.$disconnect();
        console.error(errorMessage);
        res.status(500).send(errorMessage);
    }));
});
exports.default = studentRouter;
