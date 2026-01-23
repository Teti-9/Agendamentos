-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instrutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dia" TEXT NOT NULL,
    "horario" TEXT NOT NULL
);
INSERT INTO "new_Instrutor" ("dia", "horario", "id", "nome") SELECT "dia", "horario", "id", "nome" FROM "Instrutor";
DROP TABLE "Instrutor";
ALTER TABLE "new_Instrutor" RENAME TO "Instrutor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
