-- CreateTable
CREATE TABLE "ParkingLot" (
    "id" SERIAL NOT NULL,
    "floor" VARCHAR(20) NOT NULL,
    "number" VARCHAR(20) NOT NULL,

    CONSTRAINT "ParkingLot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" SERIAL NOT NULL,
    "parkingLotId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "checkInAt" TIMESTAMP(3) NOT NULL,
    "checkOutAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "NIM" VARCHAR(50) NOT NULL,
    "licensePlate" VARCHAR(150) NOT NULL,
    "SIM" VARCHAR(150) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(150) NOT NULL,
    "token" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "licensePlate" VARCHAR(150) NOT NULL,
    "image" VARCHAR(150) NOT NULL,
    "description" VARCHAR(255) NOT NULL,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Penalty" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "description" VARCHAR(150) NOT NULL,

    CONSTRAINT "Penalty_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRCodes" (
    "id" SERIAL NOT NULL,
    "reservationId" INTEGER NOT NULL,
    "QR_in" TEXT NOT NULL,
    "QR_out" TEXT NOT NULL,

    CONSTRAINT "QRCodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Traffic" (
    "id" SERIAL NOT NULL,
    "parkingLotId" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "Traffic_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Penalty" ADD CONSTRAINT "Penalty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QRCodes" ADD CONSTRAINT "QRCodes_reservationId_fkey" FOREIGN KEY ("reservationId") REFERENCES "Reservation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Traffic" ADD CONSTRAINT "Traffic_parkingLotId_fkey" FOREIGN KEY ("parkingLotId") REFERENCES "ParkingLot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
