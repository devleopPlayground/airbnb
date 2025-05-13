-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN,
ALTER COLUMN "description" DROP NOT NULL;
