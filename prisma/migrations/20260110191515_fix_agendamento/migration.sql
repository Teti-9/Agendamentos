/*
  Warnings:

  - Added the required column `nome` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sobrenome` to the `Agendamento` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefone` to the `Agendamento` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Agendamento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "dia" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "instrutorId" INTEGER NOT NULL,
    CONSTRAINT "Agendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "Instrutor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("dia", "horario", "id", "instrutorId", "userId") SELECT "dia", "horario", "id", "instrutorId", "userId" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
