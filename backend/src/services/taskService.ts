import { Level } from "@prisma/client"
import { prisma } from "./prisma"
import Module from "module"


export async function addTask(title: string, description: string, code: string, solution: string, level: Level, moduleNames: [String]) {
    /*const modules = []
    for (const moduleName of moduleNames) {
        modules.push({name: moduleName})
    }*/
	await prisma.task.create({
		data: {
            title: title,
            description: description,
            code: code,
            solution: solution,
            level: level,
            modules: {
                //connect: moduleNames.map(name => ({name}))
                connect: [{name: "Module1"}]
            }
		}
	})
}

