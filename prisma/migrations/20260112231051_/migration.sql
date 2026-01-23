/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `Instrutor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Instrutor_nome_key" ON "Instrutor"("nome");
