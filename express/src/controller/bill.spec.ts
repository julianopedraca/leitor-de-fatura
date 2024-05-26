import { PrismaClient } from "@prisma/client";
import { CreateBillDto } from "dto/create_bill.dto";

describe("Testing bill controllser", () => {
    test("It should add bill to fatura db", async () => {
        const prisma = new PrismaClient()

        const resBody = [
            {
                "client_number": "7005400387",
                "refer_to": "MAI/2023",
                "eletric_energy_quantity": "1.105",
                "eletric_energy_amount": "926,34",
                "energy_SCEE_without_ICMS_quantity": null,
                "energy_SCEE_without_ICMS_amount": null,
                "energy_compensated_GD_I_quantity": null,
                "energy_compensated_GD_I_amount": null,
                "contribution_public_ilum": "43,10"
            },
            {
                "client_number": "7005400387",
                "refer_to": "SET/2023",
                "eletric_energy_quantity": "50",
                "eletric_energy_amount": "47,78",
                "energy_SCEE_without_ICMS_quantity": "414",
                "energy_SCEE_without_ICMS_amount": "211,13",
                "energy_compensated_GD_I_quantity": "414",
                "energy_compensated_GD_I_amount": "-201,7",
                "contribution_public_ilum": "49,43"
            }
        ]

        function formatStrToFloat(valor: string | null): number {
            if (valor == null) {
                return 0.00
            }

            valor = valor.replace(/\./g, '');
            valor = valor.replace(',', '.');
            const novoValor = parseFloat(valor)
            return novoValor
        }

        function formatStrToInt(valor: string | null): number {
            if (valor == null) {
                return 0
            }

            valor = valor.replace(/\./g, '');
            valor = valor.replace(',', '.');
            const novoValor = parseInt(valor)
            return novoValor
        }

        const data = resBody.map((bill) => {
            return {
                client_number: bill.client_number,
                refer_to: bill.refer_to,
                eletric_energy_quantity: formatStrToInt(bill.eletric_energy_quantity),
                eletric_energy_amount: formatStrToFloat(bill.eletric_energy_amount),
                energy_SCEE_without_ICMS_quantity: formatStrToInt(bill.energy_SCEE_without_ICMS_quantity),
                energy_SCEE_without_ICMS_amount: formatStrToFloat(bill.energy_SCEE_without_ICMS_amount),
                energy_compensated_GD_I_quantity: formatStrToInt(bill.energy_compensated_GD_I_quantity),
                energy_compensated_GD_I_amount: formatStrToFloat(bill.energy_compensated_GD_I_amount),
                contribution_public_ilum: formatStrToFloat(bill.contribution_public_ilum),
            }
        })

        const formatedBills: CreateBillDto = {
            data: data
        }
        
        const result = await prisma.consumoEnergiaTest.createMany(formatedBills)        
        expect(result).toBe(result);
    });
});



