/*
  Warnings:

  - You are about to drop the column `DateTime` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `reservationAt` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "DateTime",
ADD COLUMN     "reservationAt" TIMESTAMP(3) NOT NULL;
