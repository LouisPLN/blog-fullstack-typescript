/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Comment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostTag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategory" DROP CONSTRAINT "_PostCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostCategory" DROP CONSTRAINT "_PostCategory_B_fkey";

-- DropForeignKey
ALTER TABLE "_PostTag" DROP CONSTRAINT "_PostTag_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostTag" DROP CONSTRAINT "_PostTag_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "categories" TEXT[],
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "tags" TEXT[];

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Comment";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_PostCategory";

-- DropTable
DROP TABLE "_PostTag";

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
