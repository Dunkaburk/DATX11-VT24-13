import { Router } from "express";
import { prisma } from "../services/prisma";
import { addModule, getModules, getModuleTasks } from "../services/moduleService";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const moduleRouter = Router();

moduleRouter.get("/getModules", jsonParser, (req, res) => {
    getModules()
		.then(async modules => {
			res.json(modules).status(200).send();
		})
		.catch(async (e) => {
			console.error(e);
			res.status(500).send("An error occured. Check terminal.");
		})
        .finally(async () => {
            await prisma.$disconnect();
        })
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
    getModuleTasks(module)
        .then(result => {
            console.log(result);
            res.json(result.tasks).status(200).send("fetched stuff");
        })
        .catch((e) => {
            console.error(e);
            res.status(500).send("An error occured. Check terminal.");
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
});

moduleRouter.post("/addModule", jsonParser, (req, res) => {
	const name = req.body.name;
	if (!name) {
		res.status(404).send(`An error occured while trying to add user: Missing module name.`);
		return;
	}
	addModule(name)
		.then(async () => {
			await prisma.$disconnect()
			res.status(200).send();
		})
		.catch(async (e) => {
			var errorMessage = "An error occured while trying to add module: "
			if(e.code === 'P2002') errorMessage += "A module already exists with this name."
			await prisma.$disconnect()
			console.error(errorMessage)
			res.status(500).send(errorMessage);
		})
})

export default moduleRouter;