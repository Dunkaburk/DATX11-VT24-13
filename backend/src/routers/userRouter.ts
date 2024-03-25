import { Router } from "express";
import { prisma } from "../services/prisma";
import { addUser, getAllStudents, getUser, getUserByRole, updateUserName } from "../services/userService";
import { handleError } from "../services/errorService";
import { Role } from "@prisma/client";
import { Request, Response } from "express";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const studentRouter = Router();

studentRouter.get("/getAllStudents", (req, res) => {
	getAllStudents()
		.then(students => {
			res.json(students).status(200);
		})
		.catch((e) => {
			let errorMessage = handleError(e);
			res.status(500).send(errorMessage);
		})
		.finally(async () => {
			await prisma.$disconnect();
		})
})

studentRouter.get("/getStudent/:id", (req, res) => {
	getUserByDefinedRole(req, res, Role.STUDENT)
})

studentRouter.get("/getTeacher/:id", jsonParser, (req, res) => {
	getUserByDefinedRole(req, res, Role.TEACHER)
})

function getUserByDefinedRole(req: Request, res: Response, role: Role) {
	const data = req.params;
	if (!data.id) {
		res.status(500).send("Error: invalid parameters");
		return;
	}
	getUserByRole(data.id, role)
		.then(user => {
			res.json(user).status(200);
		})
		.catch((e) => {
			let errorMessage = handleError(e);
			res.status(500).send(errorMessage);
		})
		.finally(async () => {
			await prisma.$disconnect();
		})
}

studentRouter.post("/addStudent", jsonParser, (req, res) => {
	addUserByRole(req, res, Role.STUDENT)
})

studentRouter.post("/addTeacher", jsonParser, (req, res) => {
	addUserByRole(req, res, Role.TEACHER)
})

function addUserByRole(req: Request, res: Response, role: Role) {
	const data = req.body;
	if (!data.id || !data.name || !data.course) {
		res.status(500).send("Error: invalid JSON");
		return;
	}
	getUser(data.id)
		.then(user => {
			if(user) {
				res.status(500).send("Error: a user with this id already exists.");
			} else {
				executeAddUser(req, res, role);
			}
		})
		.catch((e) => {
			let errorMessage = handleError(e);
			res.status(500).send(errorMessage);
		})
		.finally(async () => {
			await prisma.$disconnect();
		})
}

function executeAddUser(req: Request, res: Response, role: Role) {
	const data = req.body;
	if (!data.id || !data.name || !data.course) {
		res.status(500).send("Error: invalid JSON");
		return;
	}
	addUser(data.id, data.name, data.course, role)
		.then(() => {
			res.status(200).send();
		})
		.catch((e) => {
			let errorMessage = handleError(e);
			res.status(500).send(errorMessage);
		})
		.finally(async () => {
			await prisma.$disconnect();
		})
}

studentRouter.post("/changeName", jsonParser, (req, res) => {
	const data = req.body;
	if (!data.id || !data.name) {
		res.status(500).send("Error: invalid JSON");
		return;
	}
	updateUserName(data.id, data.name)
		.then(() => {
			res.status(200).send("Name successfully changed.");
		})
		.catch((e) => {
			let errorMessage = handleError(e);
			res.status(500).send(errorMessage);
		})
		.finally(async () => {
			await prisma.$disconnect();
		})
})

export default studentRouter;