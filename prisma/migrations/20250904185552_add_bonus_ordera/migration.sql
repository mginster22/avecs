-- AlterTable
ALTER TABLE "public"."Order" ADD COLUMN     "bonusEarned" INTEGER DEFAULT 0,
ADD COLUMN     "bonusUsed" INTEGER DEFAULT 0;
