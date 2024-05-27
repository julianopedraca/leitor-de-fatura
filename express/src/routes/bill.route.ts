import { FaturaController } from "../controller/bill.controller";
import express from 'express';

export const router = express.Router()
const faturaController = new FaturaController()

router.post('/add-bill', faturaController.addBills) 
router.get('/bills', faturaController.getBills) 
router.post('/find-client-number', faturaController.findBillsByClientNumber) 
