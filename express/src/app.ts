import { Request, Response } from "express";
import express from "express";
import { router } from "./routes/bill.route";
import cors from 'cors';

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});

app.use(cors());
app.use(express.json())
app.use('/api/bill', router)


export default app;
