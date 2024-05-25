import { Request, Response } from 'express';
import { BillService } from '../service/bill.service';
import { CreateBillDto } from "../../dto/create_bill.dto"

class FaturaController {    
    /**
     * Add bill to 'fatura' database
     * @param req 
     * @param res 
     * @returns 
     */
    addBills = async (req: Request, res: Response) : Promise<any> => {
        const bills = req.body
        // const createFaturaDto: CreateFaturaDto = {}
        
        this.formatBillsAndCreate(bills)

        // faturaService.create(createFaturaDto)
        return res.json({a : 1})
    }


    private formatStrToFloat(valor:string | null): Number{
        if (valor == null) {
            return 0.00
        }
                
        valor = valor.replace(/\./g, '');
        valor = valor.replace(',', '.');
        const novoValor = parseFloat(valor)
        return novoValor
    }

    private formatBillsAndCreate(bills: any):void {
        const faturaService = new BillService()

        bills.forEach((bill:any) => {
            (bill.client_number as unknown) = bill.client_number !== null ? parseInt(bill.client_number) : 0;
            (bill.eletric_energy_quantity as unknown) = bill.eletric_energy_quantity !== null ? parseInt(bill.eletric_energy_quantity) : 0;
            (bill.energy_SCEE_without_ICMS_quantity as unknown) = bill.energy_SCEE_without_ICMS_quantity !== null ? parseInt(bill.energy_SCEE_without_ICMS_quantity) : 0;
            (bill.energy_compensated_GD_I_quantity as unknown) = bill.energy_compensated_GD_I_quantity !== null ? parseInt(bill.energy_compensated_GD_I_quantity) : 0;
            (bill.eletric_energy_amount as unknown) = this.formatStrToFloat(bill.eletric_energy_amount);
            (bill.energy_SCEE_without_ICMS_amount as unknown) = this.formatStrToFloat(bill.energy_SCEE_without_ICMS_amount);
            (bill.energy_compensated_GD_I_amount as unknown) = this.formatStrToFloat(bill.energy_compensated_GD_I_amount);            
            (bill.contribution_public_ilum as unknown) = this.formatStrToFloat(bill.contribution_public_ilum);

            console.log(bill);
            
        })


    }
}

export { FaturaController } 