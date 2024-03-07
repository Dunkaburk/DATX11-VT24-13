import { Router } from "express";
import { prisma } from "../services/prisma";
import { addTask } from "../services/taskService";
import { Level } from "@prisma/client";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const taskRouter = Router();

taskRouter.get("/next", (req, res) => { res.status(501).send("OoOps, not implemented") });
taskRouter.get("/previous", (req, res) => { res.status(501).send("OoOps, not implemented") });
taskRouter.post("/submit", (req, res) => { res.status(501).send("OoOps, not implemented") });
taskRouter.get("/:err", (req, res) => { res.status(404).send() });



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

    addTask(title, description, code, solution, level, modules)
        .then(async () => {
            res.status(200).send("Task added");
        })
        .catch(async (e) => {
            console.log(e);
            var errorMessage = "An error occured while trying to add user: "
            if (e.code === 'P2025') errorMessage += "a connected record was not found. Probably faulty module name."
            res.status(500).send(errorMessage + " Check terminal for more information.");
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
});

function isValidLevel(level: Level) {
    return Object.values(Level).includes(level)
}

export default taskRouter;