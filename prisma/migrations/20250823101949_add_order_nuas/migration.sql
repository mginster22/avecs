/*
  Warnings:

  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `paymentId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Order_orderNumber_key";

-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "paymentId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "public"."Order"("paymentId");
