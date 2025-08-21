/*
  Warnings:

  - Added the required column `guestId` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guestId` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "guestId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."OrderItem" ADD COLUMN     "guestId" TEXT NOT NULL;
