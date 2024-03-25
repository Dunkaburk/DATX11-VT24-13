import { Level, PrismaClient, Role } from "@prisma/client";
import { addUser, getUser } from "../src/services/userService";
import { addTask, getTaskByTitle, submitSolution } from "../src/services/taskService";
import { addModule } from "../src/services/moduleService";
const prisma = new PrismaClient();

async function main() {
    addUserIfNotExisting("cid1", "name1", "TDA555", Role.STUDENT);
    addUserIfNotExisting("cid2", "name2", "TDA555", Role.STUDENT);
    addUserIfNotExisting("cid3", "name3", "TDA555", Role.STUDENT);

    addModule("Module1")
    addModule("Module2")

    const idTask1 = await addTaskIfNotExisting("TaskTitle1", Level.BEGINNER, ["Module1"]);
    const idTask2 = await addTaskIfNotExisting("TaskTitle2", Level.BEGINNER, ["Module1", "Module2"]);
    const idTask3 = await addTaskIfNotExisting("TaskTitle3", Level.BEGINNER, ["Module1", "Module2"]);
    const idTask4 = await addTaskIfNotExisting("TaskTitle4", Level.INTERMEDIATE, ["Module1", "Module2"]);
    const idTask5 = await addTaskIfNotExisting("TaskTitle5", Level.INTERMEDIATE, ["Module1", "Module2"]);
    const idTask6 = await addTaskIfNotExisting("TaskTitle6", Level.INTERMEDIATE, ["Module1", "Module2"]);

    if(idTask1) {
        submitSolution("cid1", idTask1, "solution to task 1 from student1", true);
        submitSolution("cid2", idTask1, "solution to task 1 from student2", true);
    }
    if(idTask2) submitSolution("cid1", idTask2, "solution to task 2 from student1", false);

}

async function addTaskIfNotExisting(taskTitle: string, level: Level, modules: string[]) {
    return await getTaskByTitle(taskTitle)
        .then(task => {
            return task.id
        })
        .catch((e) => {
            if (e.code === 'P2025') {
                return addTask(taskTitle, "Description of task", "starting code", "solution of task", level, modules).then(task => {return task.id});
            }
        })
}

async function addUserIfNotExisting(userId: string, userName: string, course: string, role: Role) {
    getUser(userId)
        .then(user => {
            if(!user) {
                addUser(userId, userName, course, role);
            }
        })
        .catch((e) => {
            console.log(e);
        })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })