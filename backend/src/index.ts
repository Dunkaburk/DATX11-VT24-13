import { config } from "dotenv";
import express from "express";
import assignmentRouter from "./routers/assignmentRouter";
import categoryRouter from "./routers/categoryRouter";
import userRouter from "./routers/userRouter";


const app = express();
config();


app.use("/assignments", assignmentRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter)


app.get("/:name", (req, res) => {
	const name = req.params.name;
	res.status(200).send(`Hej ${name}`);
});

app.listen(process.env.PORT || 3000, () => { console.log(`Server started on ${process.env.PORT || 3000}`) });
