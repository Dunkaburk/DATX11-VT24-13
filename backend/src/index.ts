import { config } from "dotenv";
import express from "express";
import assignmentRouter from "./routers/assignmentRouter";
import categoryRouter from "./routers/categoryRouter";
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
config();

app.use("/assignments", assignmentRouter);
app.use("/category", categoryRouter);

app.get("/getStudents", (req, res) => {
	const students = getAllStudents()
		.then(async () => {
			await prisma.$disconnect()
		})
		.catch(async (e) => {
			console.error(e)
			await prisma.$disconnect()
			process.exit(1)
		})
	res.status(200).send(`Students in database: ${students} (kolla terminalloggen för resultat)`);
})

async function getAllStudents() {
	const allStudents = await prisma.student.findMany()
	console.log(allStudents)
	return allStudents
}

app.get("/addStudent/:name", (req, res) => {
	const name = req.params.name;
	addStudent(name)
		.then(async () => {
			await prisma.$disconnect()
			res.status(200).send(`${name} has been added to database.`);
		})
		.catch(async (e) => {
			console.error(e)
			await prisma.$disconnect()
			process.exit(1)
		})
})

async function addStudent(name: string) {
	await prisma.student.create({
		data: {
			name: name
		}
	})
}

app.get("/:name", (req, res) => {
	const name = req.params.name;
	res.status(200).send(`Hej ${name}`);
});

app.listen(process.env.PORT || 3000, () => { console.log(`Server started on ${process.env.PORT || 3000}`) });
