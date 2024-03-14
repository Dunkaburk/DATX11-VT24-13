"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const taskRouter_1 = __importDefault(require("./routers/taskRouter"));
const categoryRouter_1 = __importDefault(require("./routers/categoryRouter"));
const userRouter_1 = __importDefault(require("./routers/userRouter"));
const moduleRouter_1 = __importDefault(require("./routers/moduleRouter"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
app.use("/task", taskRouter_1.default);
app.use("/category", categoryRouter_1.default);
app.use("/user", userRouter_1.default);
app.use("/module", moduleRouter_1.default);
app.get("/:name", (req, res) => {
    const name = req.params.name;
    res.status(200).send(`Hej ${name}`);
});
app.listen(process.env.PORT || 3000, () => { console.log(`Server started on ${process.env.PORT || 3000}`); });
