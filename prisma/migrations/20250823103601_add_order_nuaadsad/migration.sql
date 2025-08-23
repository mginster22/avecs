/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderNumber]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - Made the column `orderNumber` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "public"."Order_paymentId_key";

-- AlterTable
ALTER TABLE "public"."Order" DROP COLUMN "paymentId",
ALTER COLUMN "orderNumber" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "public"."Order"("orderNumber");
