import { Request, Response } from 'express';
import { BillService } from '../service/bill.service';
import { CreateBillDto } from "../../dto/create_bill.dto"
import { IBill } from 'interface/bill.interface';

class FaturaController {
    /**
     * Add bill to 'fatura' database
     * @param req 
     * @param res 
     * @returns 
     */
    addBills = async (req: Request, res: Response): Promise<any> => {
        const bills: IBill[] = req.body
        const billServive = new BillService()

        try {
            const formatedBills = this.formatBills(bills)            
            await billServive.create(formatedBills)
        } catch (error) {
            console.log(error);
            
            return res.status(500).json({ message: "An error ocurred while adding a new bill, try again later" })
        }

        return res.json({ message: "bills added" })
    }


    private formatStrToFloat(valor: string | null): number {
        if (valor == null) {
            return 0.00
        }

        valor = valor.replace(/\./g, '');
        valor = valor.replace(',', '.');
        const novoValor = parseFloat(valor)
        return novoValor
    }

    private formatStrToInt(valor: string | null): number {
        if (valor == null) {
            return 0
        }

        valor = valor.replace(/\./g, '');
        valor = valor.replace(',', '.');
        const novoValor = parseInt(valor)
        return novoValor
    }

    private formatBills(bills: IBill[]) : CreateBillDto{

        const data = bills.map((bill) => {
            return {
                client_number: this.formatStrToInt(bill.client_number),
                refer_to: bill.refer_to,
                eletric_energy_quantity: this.formatStrToInt(bill.eletric_energy_quantity),
                eletric_energy_amount: this.formatStrToFloat(bill.eletric_energy_amount),
                energy_SCEE_without_ICMS_quantity: this.formatStrToInt(bill.energy_SCEE_without_ICMS_quantity),
                energy_SCEE_without_ICMS_amount: this.formatStrToFloat(bill.energy_SCEE_without_ICMS_amount),
                energy_compensated_GD_I_quantity: this.formatStrToInt(bill.energy_compensated_GD_I_quantity),
                energy_compensated_GD_I_amount: this.formatStrToFloat(bill.energy_compensated_GD_I_amount),
                contribution_public_ilum: this.formatStrToFloat(bill.contribution_public_ilum),
            }
        })

        const formatedBills: CreateBillDto = {
            data: data
        }
        
        return formatedBills
    }
}

export { FaturaController } 