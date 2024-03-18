import { Router } from "express";
import { prisma } from "../services/prisma";
import { addModule, getModules, getModuleTasks, getModuleTasksByUser } from "../services/moduleService";
import { handleError } from "../services/errorService";

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

moduleRouter.get("/getModuleTasks", jsonParser, (req, res) => {
    const data = req.body;
	if (!data.module) {
		res.status(500).send("Error: invalid JSON");
		return;
	}
	if(data.userId) {
		getModuleTasksByUser(data.module, data.userId)
        .then(result => {
            res.json(result.tasks).status(200).send();
        })
        .catch((e) => {
            let errorMessage = handleError(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
	} else {
		getModuleTasks(data.module)
        .then(result => {
            res.json(result.tasks).status(200).send();
        })
        .catch((e) => {
            let errorMessage = handleError(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
	}
});

moduleRouter.post("/addModule", jsonParser, (req, res) => {
	const name = req.body.name;
	if (!name) {
		res.status(500).send("Error: invalid JSON");
		return;
	}
	addModule(name)
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
})

export default moduleRouter;