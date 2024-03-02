/*
  Warnings:

  - You are about to drop the column `moduleName` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Task` table. All the data in the column will be lost.
  - The `level` column on the `Task` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `code` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('STUDENT', 'TEACHER', 'TEACHINGASSISTANT');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('BEGINNER', 'UPPER_BEGINNER', 'INTERMEDIATE', 'UPPER_INTERMEDIATE', 'ADVANCED');

-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_moduleName_fkey";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "moduleName",
DROP COLUMN "text",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
DROP COLUMN "level",
ADD COLUMN     "level" "Level" NOT NULL DEFAULT 'BEGINNER';

-- DropTable
DROP TABLE "Student";

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "course" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolvedTasks" (
    "userId" TEXT NOT NULL,
    "taskId" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,
    "noOfTries" INTEGER NOT NULL,

    CONSTRAINT "SolvedTasks_pkey" PRIMARY KEY ("userId","taskId")
);

-- CreateTable
CREATE TABLE "_ModuleToTask" (
    "A" VARCHAR(255) NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ModuleToTask_AB_unique" ON "_ModuleToTask"("A", "B");

-- CreateIndex
CREATE INDEX "_ModuleToTask_B_index" ON "_ModuleToTask"("B");

-- AddForeignKey
ALTER TABLE "SolvedTasks" ADD CONSTRAINT "SolvedTasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolvedTasks" ADD CONSTRAINT "SolvedTasks_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToTask" ADD CONSTRAINT "_ModuleToTask_A_fkey" FOREIGN KEY ("A") REFERENCES "Module"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToTask" ADD CONSTRAINT "_ModuleToTask_B_fkey" FOREIGN KEY ("B") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;
