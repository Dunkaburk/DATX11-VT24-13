import { Router } from "express";
import { prisma } from "../services/prisma";
import { addTask, submitSolution, getTask, getTaskByUser } from "../services/taskService";
import { Level } from "@prisma/client";
import { handleError } from "../services/errorService";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const taskRouter = Router();


taskRouter.get("/getTask", jsonParser, (req, res) => {
    const data = req.body;
    if (!data.taskId) {
        res.status(501).send(`Error: must have a taskId.`);
        return;
    }
    if (data.userId) {
        getTaskByUser(data.userId, data.taskId)
            .then(task => {
                res.json(task).status(200);
            })
            .catch((e) => {
                let errorMessage = handleError(e);
                res.status(500).send(errorMessage);
            })
            .finally(async () => {
                await prisma.$disconnect();
            })
    } else {
        getTask(data.taskId)
            .then(task => {
                res.json(task).status(200);
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

taskRouter.post("/submit", jsonParser, (req, res) => {
    const data = req.body;
    //TODO eventuellt utföra rättning här?
    if (!data.userId || !data.taskId || !data.solution || data.solutionAccepted == undefined) {
        res.status(500).send("Error: invalid JSON");
        return;
    }
    submitSolution(data.userId, data.taskId, data.solution, data.solutionAccepted)
        .then(() => {
            res.status(200).send("Task successfully submitted.");
        })
        .catch((e) => {
            let errorMessage = handleError(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })

});

taskRouter.post("/addTask", jsonParser, (req, res) => {
    const data = req.body;
    if (!data.title || !data.description || !data.code || !data.solution || !data.level) {
        res.status(500).send("Error: invalid JSON");
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
            let errorMessage = handleError(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
});

function isValidLevel(level: Level) {
    return Object.values(Level).includes(level)
}

export default taskRouter;