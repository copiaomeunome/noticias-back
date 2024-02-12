/*
  Warnings:

  - The primary key for the `Noticias` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Noticias` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Noticias" DROP CONSTRAINT "Noticias_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Noticias_pkey" PRIMARY KEY ("id");
