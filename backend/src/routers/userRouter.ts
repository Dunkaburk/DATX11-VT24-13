import { Router } from "express";
import { prisma } from "../services/prisma";
import { addUser, getAllStudents } from "../services/userService";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const studentRouter = Router();

studentRouter.get("/getAllStudents", jsonParser, async (req, res) => {
	getAllStudents()
		.then(async students => {
			res.json(students).status(200).send();
			await prisma.$disconnect()
		})
		.catch(async (e) => {
			console.error(e)
			res.status(500).send("An error occured. Check terminal.");
			await prisma.$disconnect()
		})
})

studentRouter.post("/addUser", jsonParser, (req, res) => {
	const data = req.body;
	const id = data.id ? data.id : null;
	const name = data.name ? data.name : null;
	const course = data.course ? data.course : null;
	const role =  data.role ? data.role : null;
	if (!id || !name || !course || !role) {
		res.status(404).send(`An error occured while trying to add user: Missing information.
					Following values were received:
				 	id = ${id}, name = ${name}, course = ${course}, role = ${role}`);
		return;
	}
	addUser(id, name, course, role)
		.then(async () => {
			await prisma.$disconnect()
			res.status(200).send();
		})
		.catch(async (e) => {
			var errorMessage = "An error occured while trying to add user: "
			if(e.code === 'P2002') errorMessage += "A user already exists with this id."
			await prisma.$disconnect()
			console.error(errorMessage)
			res.status(500).send(errorMessage);
		})
})

export default studentRouter;