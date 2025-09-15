/*
  Warnings:

  - Added the required column `date` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "public"."Transaction" ADD COLUMN     "category" TEXT,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
