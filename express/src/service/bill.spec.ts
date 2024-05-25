import { PrismaClient } from "@prisma/client";

describe("Test fatura service", () => {
    test("It should add bill to fatura db", async () => {
        const prisma = new PrismaClient()
        
        const result = await prisma.consumoEnergiaTest.create({
            data: {
                client_number: 7005400387, 
                refer_to: 'AGO/2023',
                eletric_energy_quantity: 50,
                eletric_energy_amount: 47.31,
                energy_SCEE_without_ICMS_quantity: 370,
                energy_SCEE_without_ICMS_amount: 186.84,
                energy_compensated_GD_I_quantity: 370,
                energy_compensated_GD_I_value: -180.3,
                contribution_public_ilum: 49.43,
            }
        })
        
        expect(result).toBe(result);
    });
  });
