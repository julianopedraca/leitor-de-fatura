export interface CreateBillDto {
    data: {
        client_number: string, 
        refer_to: string,
        eletric_energy_quantity: number,
        eletric_energy_amount: number,
        energy_SCEE_without_ICMS_quantity: number,
        energy_SCEE_without_ICMS_amount: number,
        energy_compensated_GD_I_quantity: number,
        energy_compensated_GD_I_amount: number,
        contribution_public_ilum: number,    
    }[]
}