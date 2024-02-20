import { Router } from "express";


const categoryRouter = Router();
categoryRouter.get("/getAll", (req, res) => { console.log("OoOps, not implemented") });
categoryRouter.get("/get/:category", (req, res) => { console.log("OoOps, not implemented") });
categoryRouter.post("/addCategory", (req, res) => { console.log("OoOps, not implemented") });
export default categoryRouter;