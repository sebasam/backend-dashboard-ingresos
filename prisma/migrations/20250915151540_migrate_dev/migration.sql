/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Transaction` table. All the data in the column will be lost.
  - The `id` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `userId` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "category",
DROP COLUMN "createdAt",
DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "type",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "userId",
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
