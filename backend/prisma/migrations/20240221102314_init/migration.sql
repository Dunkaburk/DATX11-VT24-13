-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "level" INTEGER NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "solution" TEXT NOT NULL,
    "moduleName" VARCHAR(255) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Module" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("name")
);

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_moduleName_fkey" FOREIGN KEY ("moduleName") REFERENCES "Module"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
