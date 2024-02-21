import { prisma } from "./prisma"


export async function getAllStudents() {
	const allStudents = await prisma.student.findMany()
	console.log(allStudents)
	return allStudents
}

export async function addStudent(name: string) {
	await prisma.student.create({
		data: {
			name: name
		}
	})
}