import { Router } from "express";


const assignmentRouter = Router();
assignmentRouter.get("/next", (req, res) => { console.log("OoOps, not implemented") });
assignmentRouter.get("/previous", (req, res) => { console.log("OoOps, not implemented") });
assignmentRouter.post("/submit", (req, res) => { console.log("OoOps, not implemented") });

export default assignmentRouter;