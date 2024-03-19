import { Role } from "@prisma/client"
import { prisma } from "./prisma"

export async function getUser(userId: string, role: Role) {
	return await prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			course: true
		},
		where: {
			id: userId,
			role: role
		},
	})
}

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
			id: id,
			name: name,
			course: course,
			role: role
		}
	})
}

export async function updateUserName(id: string, name: string) {
	await prisma.user.update({
		where: {
			id: id
		},
		data: {
			name: name
		}
	})
}