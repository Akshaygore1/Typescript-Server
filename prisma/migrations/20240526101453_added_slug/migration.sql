/*
  Warnings:

  - You are about to drop the column `slug` on the `Profile` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Profile_slug_key";

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "slug";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_slug_key" ON "User"("slug");
