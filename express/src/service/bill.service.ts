import { json } from "express"
import { PrismaClient } from "@prisma/client";
import { CreateBillDto } from "dto/create_bill.dto";

class BillService  {

    async create(createBillDto: CreateBillDto){
        const prisma = new PrismaClient()

        try {
        } catch (error) {
            throw error;
        }

    }
}

export { BillService } 