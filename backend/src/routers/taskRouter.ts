import { Router } from "express";
import { prisma } from "../services/prisma";
import { addTask, saveSolution, submitSolution, getTask, getTaskByUser } from "../services/taskService";
import { Level } from "@prisma/client";
import { Request, Response } from "express";
import { handleError } from "../services/errorService";

var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const taskRouter = Router();


taskRouter.get("/getTask/:taskId/:userId?", (req, res) => {
    const data = req.params;
    const taskId = Number(data.taskId);
    const userId = data.userId;
    if (!taskId) {
        res.status(501).send(`Error: must have a taskId.`);
        return;
    }
    if (userId) {
        getTaskByUser(userId, taskId)
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
        getTask(taskId)
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

taskRouter.post("/save", jsonParser, (req, res) => {
    const data = req.body;
    if (!data.userId || !data.taskId || !data.solution) {
        res.status(500).send("Error: invalid JSON");
        return;
    }
    saveSolution(data.userId, data.taskId, data.solution)
        .then(() => {
            res.status(200).send("Task successfully saved.");
        })
        .catch((e) => {
            let errorMessage = handleError(e);
            res.status(500).send(errorMessage);
        })
        .finally(async () => {
            await prisma.$disconnect();
        })
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

taskRouter.post("/addBeginnerTask", jsonParser, (req, res) => {
    addTaskByLevel(req, res, Level.BEGINNER);
});

taskRouter.post("/addIntermediateTask", jsonParser, (req, res) => {
    addTaskByLevel(req, res, Level.INTERMEDIATE);
});

taskRouter.post("/addAdvancedTask", jsonParser, (req, res) => {
    addTaskByLevel(req, res, Level.ADVANCED);
});

function addTaskByLevel(req: Request, res: Response, level: Level) {
    const data = req.body;
    if (!data.title || !data.description || !data.code || !data.solution) {
        res.status(500).send("Error: invalid JSON");
        return;
    }

    addTask(data.title, data.description, data.code, data.solution, level, data.modules)
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
}

export default taskRouter;