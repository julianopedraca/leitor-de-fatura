export interface IBill {
    client_number: string, 
    refer_to: string,
    eletric_energy_quantity: string,
    eletric_energy_amount: string,
    energy_SCEE_without_ICMS_quantity: string,
    energy_SCEE_without_ICMS_amount: string,
    energy_compensated_GD_I_quantity: string,
    energy_compensated_GD_I_amount: string,
    contribution_public_ilum: string,
    pdf_base64: string,
}