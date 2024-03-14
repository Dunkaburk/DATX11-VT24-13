"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryRouter = (0, express_1.Router)();
categoryRouter.get("/getAll", (req, res) => { res.status(501).send("OoOps, not implemented"); });
categoryRouter.get("/get/:category", (req, res) => { res.status(501).send("OoOps, not implemented"); });
categoryRouter.post("/addCategory", (req, res) => { res.status(501).send("OoOps, not implemented"); });
categoryRouter.get("/:err", (req, res) => { res.status(404).send(); });
exports.default = categoryRouter;
