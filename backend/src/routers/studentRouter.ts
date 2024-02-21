import { Router } from "express";
import { prisma } from "../services/prisma";
import { addStudent, getAllStudents } from "../services/studentService";



const studentRouter = Router();

studentRouter.get("/getAll", (req, res) => {
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



studentRouter.get("/add/:name", (req, res) => {
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


export default studentRouter;