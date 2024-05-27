import { PrismaClient } from "@prisma/client";
import { CreateBillDto } from "dto/create_bill.dto";

class BillService {
    prisma = new PrismaClient()

    /**
     * use createMany to add data to db, also can select if use test schema or base schema
     * @param createBillDto 
     * @param useTest 
     * @returns 
     */
    async create(createBillDto: CreateBillDto, useTest = false) {
        const result = await this.prisma.consumoEnergiaBase.createMany(createBillDto)
        return result
    }

    async getAll() {
        const result = await this.prisma.consumoEnergiaBase.findMany()
        return result
    }

    async findByClientNumber(client_number:string) {
        const result = await this.prisma.consumoEnergiaBase.findMany({
            where: {
                client_number: client_number

            }
        })
        return result
    }

}

export { BillService } 
