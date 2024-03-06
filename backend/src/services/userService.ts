import { Role } from "@prisma/client"
import { prisma } from "./prisma"


export async function getAllStudents() {
	return await prisma.user.findMany({
		where: {
			role: Role.STUDENT
		}
	})
}

export async function addUser(id: string, name: string, course: string, role: Role) {
	await prisma.user.create({
		data: {
			id: 	id,
			name: 	name,
			course: course,
			role: role
		}
	})
}