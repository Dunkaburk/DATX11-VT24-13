import { Router } from "express";


const categoryRouter = Router();
categoryRouter.get("/getAll", (req, res) => { res.status(200).json({ "categories": ["Banana", "Variables", "Classes"] }) });
categoryRouter.get("/get/:category", (req, res) => { res.status(200).json({ "assignments": ["Yes", "No?", "Maybe a third assignment here"] }) });
categoryRouter.post("/addCategory", (req, res) => { res.status(501).send("OoOps, not implemented") });
categoryRouter.get("/:err", (req, res) => { res.status(404).send() });
export default categoryRouter;