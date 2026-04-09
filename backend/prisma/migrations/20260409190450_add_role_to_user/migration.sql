-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'standard', 'premium');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'standard';
