import { Role } from "@prisma/client"
import { prisma } from "./prisma"


export async function getAllStudents() {
	const allStudents = await prisma.user.findMany({
		where: {
			role: "STUDENT"
		}
	})
	console.log(allStudents)
	return allStudents
}

export async function addStudent(id: string, name: string, course: string) {
	await prisma.user.create({
		data: {
			id: 	id,
			name: 	name,
			course: course
		}
	})
}