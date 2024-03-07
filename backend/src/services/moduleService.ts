import { Role } from "@prisma/client"
import { prisma } from "./prisma"

export async function getModules() {
	return await prisma.module.findMany();
}

export async function addModule(name: string) {
	await prisma.module.create({
		data: {
            name: name
		}
	})
}

export async function getModuleTasks(moduleName: string) {
	return await prisma.module.findUniqueOrThrow({
		where: {
			name: moduleName
		},
        include: {
            tasks: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
	})
}