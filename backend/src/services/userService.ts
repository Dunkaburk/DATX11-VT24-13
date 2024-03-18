import { Role } from "@prisma/client"
import { prisma } from "./prisma"


export async function getAllStudents() {
	return await prisma.user.findMany({
		where: {
			role: Role.STUDENT
		},
		select: {
			id: true,
			name: true,
			course: true
		}
	})
}

export async function addUser(id: string, name: string, course: string, role: Role) {
	await prisma.user.upsert({
		where: {
			id: id
		},
		update: {
			name: name,
			course: course,
			role: role
		},
		create: {
			id: 	id,
			name: 	name,
			course: course,
			role: role
		}
	})
}