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
    "professor" TEXT,
    CONSTRAINT "Agendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Agendamento_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Instrutor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Agendamento" ("dia", "horario", "id", "nome", "sobrenome", "telefone", "userId") SELECT "dia", "horario", "id", "nome", "sobrenome", "telefone", "userId" FROM "Agendamento";
DROP TABLE "Agendamento";
ALTER TABLE "new_Agendamento" RENAME TO "Agendamento";
CREATE UNIQUE INDEX "Agendamento_telefone_key" ON "Agendamento"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
