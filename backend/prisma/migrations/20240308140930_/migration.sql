/*
  Warnings:

  - Added the required column `solutionAccepted` to the `SolvedTasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SolvedTasks" ADD COLUMN     "solutionAccepted" BOOLEAN NOT NULL;
