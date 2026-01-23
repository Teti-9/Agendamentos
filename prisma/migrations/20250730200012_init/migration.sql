/*
  Warnings:

  - You are about to drop the column `disponibilidade` on the `Instrutor` table. All the data in the column will be lost.
  - Added the required column `dia` to the `Instrutor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Instrutor` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Instrutor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "dia" DATETIME NOT NULL,
    "horario" TEXT NOT NULL
);
INSERT INTO "new_Instrutor" ("id", "nome") SELECT "id", "nome" FROM "Instrutor";
DROP TABLE "Instrutor";
ALTER TABLE "new_Instrutor" RENAME TO "Instrutor";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
