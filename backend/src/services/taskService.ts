import { Level } from "@prisma/client"
import { prisma } from "./prisma"


export async function addTask(title: string, description: string, code: string, solution: string, level: Level, moduleNames: string[]) {
    return await prisma.task.create({
        data: {
            title: title,
            description: description,
            code: code,
            solution: solution,
            level: level,
            modules: {
                connect: moduleNames.map(name => ({ name }))
            }
        }
    })
}

export async function saveSolution(userId: string, taskId: number, solution: string) {
    await prisma.solvedTasks.upsert({
        where: {
            solvedTaskId: {
                userId: userId,
                taskId: taskId
            }
        },
        update: {
            solution: solution
        },
        create: {
            userId: userId,
            taskId: taskId,
            solution: solution,
            noOfTries: 0
        }
    })
}

export async function submitSolution(userId: string, taskId: number, solution: string, solutionAccepted: boolean) {
    await prisma.solvedTasks.upsert({
        where: {
            solvedTaskId: {
                userId: userId,
                taskId: taskId
            }
        },
        update: {
            solution: solution,
            solutionAccepted: solutionAccepted,
            noOfTries: { increment: 1 }
        },
        create: {
            userId: userId,
            taskId: taskId,
            solution: solution,
            solutionAccepted: solutionAccepted
        }
    })
}

export async function getTask(taskId: number) {
    return await prisma.task.findUnique({
        where: {
            id: taskId
        }
    })
}

export async function getTaskByUser(userId: string, taskId: number) {
    return await prisma.task.findUnique({
        select: {
            id: true,
            title: true,
            description: true,
            code: true,
            level: true,
            solvedTasks: {
                select: {
                    solution: true,
                    solutionAccepted: true,
                    noOfTries: true
                },
                where: {
                    userId: userId
                },
            }
        },
        where: {
            id: taskId
        },
    })
}

export async function getTaskByTitle(title: string) {
    return await prisma.task.findUniqueOrThrow({
        select: {
            id: true,
            title: true
        },
        where: {
            title: title
        }
    })
}
