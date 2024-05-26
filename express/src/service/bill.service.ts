import { PrismaClient } from "@prisma/client";
import { CreateBillDto } from "dto/create_bill.dto";

class BillService {
    prisma = new PrismaClient()

    async create(createBillDto: CreateBillDto) {
        const result = await this.prisma.consumoEnergiaTest.createMany(createBillDto)
        return result
    }
}

export { BillService } 
