import { Router } from "express";


const assignmentRouter = Router();
assignmentRouter.get("/next", (req, res) => { res.status(501).send("OoOps, not implemented") });
assignmentRouter.get("/previous", (req, res) => { res.status(501).send("OoOps, not implemented") });
assignmentRouter.post("/submit", (req, res) => { res.status(501).send("OoOps, not implemented") });
assignmentRouter.get("/:err", (req, res) => { res.status(404).send() });
export default assignmentRouter;