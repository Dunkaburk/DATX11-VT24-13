import { Role } from "@prisma/client"
import { prisma } from "./prisma"

export async function getUser(userId: string) {
	return await prisma.user.findUnique({
		select: {
			id: true,
			name: true,
			course: true,
			role: true
		},
		where: {
			id: userId
		},
	})
}

export async function getUserByRole(userId: string, role: Role) {
	return await prisma.user.findUniqueOrThrow({
		select: {
			id: true,
			name: true,
			course: true,
			role: true
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
	await prisma.user.create({
		data: {
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