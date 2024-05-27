-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "base";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "test";

-- CreateTable
CREATE TABLE "base"."consumo_energia" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "client_number" VARCHAR(10) NOT NULL,
    "refer_to" VARCHAR(10) NOT NULL,
    "eletric_energy_quantity" INTEGER NOT NULL,
    "eletric_energy_amount" MONEY NOT NULL,
    "energy_SCEE_without_ICMS_quantity" INTEGER NOT NULL,
    "energy_SCEE_without_ICMS_amount" MONEY NOT NULL,
    "energy_compensated_GD_I_quantity" INTEGER NOT NULL,
    "energy_compensated_GD_I_amount" MONEY NOT NULL,
    "contribution_public_ilum" MONEY NOT NULL,

    CONSTRAINT "consumo_energia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test"."consumo_energia" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "client_number" VARCHAR(10) NOT NULL,
    "refer_to" VARCHAR(10) NOT NULL,
    "eletric_energy_quantity" INTEGER NOT NULL,
    "eletric_energy_amount" MONEY NOT NULL,
    "energy_SCEE_without_ICMS_quantity" INTEGER NOT NULL,
    "energy_SCEE_without_ICMS_amount" MONEY NOT NULL,
    "energy_compensated_GD_I_quantity" INTEGER NOT NULL,
    "energy_compensated_GD_I_amount" MONEY NOT NULL,
    "contribution_public_ilum" MONEY NOT NULL,

    CONSTRAINT "consumo_energia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "test"."fatura_pdf" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "energy_usage_id" INTEGER NOT NULL,
    "bill_base64" TEXT NOT NULL,

    CONSTRAINT "fatura_pdf_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "base"."fatura_pdf" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "energy_usage_id" INTEGER NOT NULL,
    "bill_base64" TEXT NOT NULL,

    CONSTRAINT "fatura_pdf_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fatura_pdf_energy_usage_id_key" ON "test"."fatura_pdf"("energy_usage_id");

-- CreateIndex
CREATE UNIQUE INDEX "fatura_pdf_energy_usage_id_key" ON "base"."fatura_pdf"("energy_usage_id");

-- AddForeignKey
ALTER TABLE "test"."fatura_pdf" ADD CONSTRAINT "fatura_pdf_energy_usage_id_fkey" FOREIGN KEY ("energy_usage_id") REFERENCES "test"."consumo_energia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "base"."fatura_pdf" ADD CONSTRAINT "fatura_pdf_energy_usage_id_fkey" FOREIGN KEY ("energy_usage_id") REFERENCES "base"."consumo_energia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
