-- CreateEnum
CREATE TYPE "Availability" AS ENUM ('IN_STORE', 'ONLINE');

-- CreateTable
CREATE TABLE "Products" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" TIMESTAMP(3) NOT NULL,
    "availability" "Availability" NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);
