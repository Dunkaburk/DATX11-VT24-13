import { config } from "dotenv";
import express from "express";
import assignmentRouter from "./routers/assignmentRouter";
import categoryRouter from "./routers/categoryRouter";

const app = express();
config();

app.use("/assignments", assignmentRouter);
app.use("/category", categoryRouter);

app.get("/:name", (req, res) => {
	const name = req.params.name;
	res.status(200).send(`Hej ${name}`);
});

app.listen(process.env.PORT || 3000, () => { console.log(`Server started on ${process.env.PORT || 3000}`) });
