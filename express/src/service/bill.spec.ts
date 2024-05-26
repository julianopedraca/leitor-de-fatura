import { PrismaClient } from "@prisma/client";

describe("Test fatura service", () => {
    test("It should add bill to fatura db", async () => {
        const prisma = new PrismaClient()
        
        const result = await prisma.consumoEnergiaTest.createMany({
            data: [
              {
                client_number: 7005400387,
                refer_to: 'MAI/2023',
                eletric_energy_quantity: 1105,
                eletric_energy_amount: 926.34,
                energy_SCEE_without_ICMS_quantity: 0,
                energy_SCEE_without_ICMS_amount: 0,
                energy_compensated_GD_I_quantity: 0,
                energy_compensated_GD_I_amount: 0,
                contribution_public_ilum: 43.1
              },
              {
                client_number: 7005400387,
                refer_to: 'SET/2023',
                eletric_energy_quantity: 50,
                eletric_energy_amount: 47.78,
                energy_SCEE_without_ICMS_quantity: 414,
                energy_SCEE_without_ICMS_amount: 211.13,
                energy_compensated_GD_I_quantity: 414,
                energy_compensated_GD_I_amount: -201.7,
                contribution_public_ilum: 49.43
              }
            ]
          })
        
        expect(result).toBe(result);
    });
  });
