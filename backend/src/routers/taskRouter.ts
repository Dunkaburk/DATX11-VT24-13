import { Router } from "express";
import { prisma } from "../services/prisma";
import { addTask, submitSolution, getTask, getTaskByUser } from "../services/taskService";
import { Level } from "@prisma/client";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const taskRouter = Router();


taskRouter.get("/getTask", jsonParser, (req, res) => { 
    const data = req.body;
    if (!data.taskId) {
        res.status(501).send(`Error: must have a taskId.`);
		return;
    }
    if(data.userId) {
        getTaskByUser(data.userId, data.taskId)
        .then(task => {
            res.json(task).status(200).send();
        })
        .catch((e) => {
            let errorMessage = translatePrismaErrorCodes(e.code);
            console.log(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
    } else {
        getTask(data.taskId)
        .then(task => {
            res.json(task).status(200).send();
        })
        .catch((e) => {
            let errorMessage = translatePrismaErrorCodes(e.code);
            console.log(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
    }
});

taskRouter.get("/next", (req, res) => { res.status(501).send("OoOps, not implemented") });
taskRouter.get("/previous", (req, res) => { res.status(501).send("OoOps, not implemented") });
taskRouter.get("/:err", (req, res) => { res.status(404).send() });


taskRouter.post("/submit", jsonParser, (req, res) => { 
    const data = req.body;
    //TODO eventuellt utföra rättning här?
    if (!data.userId || !data.taskId || !data.solution || data.solutionAccepted == undefined) {
        res.status(404).send(`An error occured while trying to submit solution: Missing information.
					Following values were received:
                    userId = ${data.userId}, taskId = ${data.taskId}, solution = ${data.solution}, solutionAccepted = ${data.solutionAccepted}`);
		return;
    }
    submitSolution(data.userId, data.taskId, data.solution, data.solutionAccepted)
        .then(() => {
            res.status(200).send("Task successfully submitted.");
        })
        .catch((e) => {
            let errorMessage = translatePrismaErrorCodes(e.code);
            console.log(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })

});

taskRouter.post("/addTask", jsonParser, (req, res) => { 
    const data = req.body;
    if (!data.title || !data.description || !data.code || !data.solution || !data.level) {
		res.status(404).send(`An error occured while trying to add user: Missing information.
					Following values were received:
				 	title = ${data.title}, description = ${data.description}, code = ${data.code}, solution = ${data.solution}, level = ${data.level}`);
		return;
	}
    if (!isValidLevel(data.level)) {
        res.status(404).send("Invalid level sent.");
        return;
    }

    addTask(data.title, data.description, data.code, data.solution, data.level, data.modules)
        .then(async () => {
            res.status(200).send("Task added");
        })
        .catch(async (e) => {
            let errorMessage = translatePrismaErrorCodes(e.code);
            console.log(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
});

function isValidLevel(level: Level) {
    return Object.values(Level).includes(level)
}

function translatePrismaErrorCodes(prismaErrorCode: string) {
    let errorMessage = "An error occured: ";
    if(prismaErrorCode === 'P2003') errorMessage += "Foreign key constraint error. StudentId or taskId does not exist. "
    if(prismaErrorCode === 'P2002') errorMessage += "Record already exists in database."
    if (prismaErrorCode === 'P2025') errorMessage += "A connected record was not found."
    return errorMessage;
}

export default taskRouter;