/*
  Warnings:

  - You are about to drop the column `guestId` on the `OrderItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Order" ALTER COLUMN "guestId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."OrderItem" DROP COLUMN "guestId";
