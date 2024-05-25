import os
import json
import re
from pypdf import PdfReader

print("initiating data extraction...")

reader = PdfReader

rootDir = "./faturas"

def encoder(obj):
    if isinstance(obj, set):
        return list(obj)
    return obj
 

## look inside every folder
for root, subdirs, files in os.walk(rootDir):
    if len(files) > 0:
        ## check files inside folder
        for file in files:
            file_path = os.path.join(root, file)
            pdfFile = reader(file_path)
            page = 0
            ## get data from every page on file
            while page < len(pdfFile.pages):
                content = pdfFile.pages[page]
                text = content.extract_text()

                # get index from query
                indexClientNumber = text.find('Nº DO CLIENTE')
                indexReferTo = text.find('Referente a')
                indexEletricEnergy = text.find('Energia Elétrica')
                indexEnergySCEEwICMS = text.find('Energia SCEE s/ ICMS')
                indexEnergyCompensatedGDI = text.find('Energia compensada GD I')
                indexContributionPublicIlum = text.find('Contrib Ilum Publica Municipal')

                # get value from query
                clientNumber = text[indexClientNumber+52:indexClientNumber+70].strip() if indexClientNumber > 0 else None
                referTo = text[indexReferTo+99:indexReferTo+110].strip() if indexReferTo > 0 else None
                eletricEnergyQuantity = text[indexEletricEnergy+20:indexEletricEnergy+31].strip() if indexEletricEnergy > 0 else None
                eletricEnergyAmount = text[indexEletricEnergy+45:indexEletricEnergy+55].strip() if indexEletricEnergy > 0 else None
                energySCEEwICMSQuantity = text[indexEnergySCEEwICMS+30:indexEnergySCEEwICMS+35].strip() if indexEnergySCEEwICMS > 0 else None
                energySCEEwICMSAmount = text[indexEnergySCEEwICMS+50:indexEnergySCEEwICMS+60].strip() if indexEnergySCEEwICMS > 0 else None
                energyCompensatedGDIQuantity = text[indexEnergyCompensatedGDI+30:indexEnergyCompensatedGDI+36].strip() if indexEnergyCompensatedGDI > 0 else None
                energyCompensatedGDIAmount = text[indexEnergyCompensatedGDI+50:indexEnergyCompensatedGDI+60].strip() if indexEnergyCompensatedGDI > 0 else None
                contributionPublicIlum = text[indexContributionPublicIlum+38:indexContributionPublicIlum+46].strip() if indexContributionPublicIlum > 0 else None

                invoiceData = [
                    ('client_number', clientNumber),
                    ('refer_to', referTo),
                    ('eletric_energy_quantity', eletricEnergyQuantity),
                    ('eletric_energy_amount', eletricEnergyAmount),
                    ('energy_SCEE_without_ICMS_quantity', energySCEEwICMSQuantity),
                    ('energy_SCEE_without_ICMS_amount', energySCEEwICMSAmount),
                    ('energy_compensated_GD_I_quantity', energyCompensatedGDIQuantity),
                    ('energy_compensated_GD_I_amount', energyCompensatedGDIAmount),
                    ('contribution_public_ilum', contributionPublicIlum),
                ]

                # build json
                json_data = dict(invoiceData)
                json_string = json.dumps(json_data, default=encoder)
                print(json_string)
                page += 1

print("data extration finished")