import { config } from "dotenv";
import cors from 'cors';
import express from "express";
import taskRouter from "./routers/taskRouter";
import categoryRouter from "./routers/categoryRouter";
import userRouter from "./routers/userRouter";
import moduleRouter from "./routers/moduleRouter";


const app = express();
config();

app.use(express.json());
app.use(cors());

app.use("/task", taskRouter);
app.use("/category", categoryRouter);
app.use("/user", userRouter);
app.use("/module", moduleRouter);


app.get("/:name", (req, res) => {
	const name = req.params.name;
	res.status(200).send(`Hej ${name}`);
});

app.listen(process.env.PORT || 3000, () => { console.log(`Server started on ${process.env.PORT || 3000}`) });
