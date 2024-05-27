"use client";
import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { EnergyConsunption } from '@/components/dashboard/overview/energy-consuption';
import { BarChart } from '@/components/dashboard/overview/bar-chart';
import { TotalValueWithoutGD } from '@/components/dashboard/overview/total-value-without-GD';
import { EnergyCompensated } from '@/components/dashboard/overview/energy-compensated';
import { TotalCompensatedEnergyGDAmount } from '@/components/dashboard/overview/total-compensated-energy-GD-amount';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export interface Bill {
  client_number: string,
  refer_to: string,
  eletric_energy_quantity: number,
  eletric_energy_amount: string,
  energy_SCEE_without_ICMS_quantity: number,
  energy_SCEE_without_ICMS_amount: string,
  energy_compensated_GD_I_quantity: number,
  energy_compensated_GD_I_amount: string,
  contribution_public_ilum: string,
}

async function getAllBills() {
  const res = await fetch('http://localhost:3000/api/bill/bills', {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const result = await res.json()
  return result
}

export default function Page() {
  const [energyConsuptionRes, setEnergyConsuptionRes] = useState(0);
  const [energyCompensateQuantitydRes, setEnergyCompensateQuantitydRes] = useState(0);
  const [totalValuewithoutGDRes, setTotalValuewithoutGDRes] = useState(0);
  const [totalCompensatedEnergyAmountRes, setTotalCompensatedEnergyAmountRes] = useState(0);
  const [totalEletricEnergyQuantityByMonth, setTotalEletricEnergyQuantityByMonth] = useState([]);
  const [totalEletricEnergyAmountByMonth, setTotalEletricEnergyAmountByMonth] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bills = await getAllBills();

        const energyConsuption = sumEnergyConsuption(bills.result);
        setEnergyConsuptionRes(Math.round(energyConsuption * 100) / 100);

        const energyCompensatedQuantity = sumEnergyCompensatedQuantity(bills.result);
        setEnergyCompensateQuantitydRes(Math.round(energyCompensatedQuantity * 100) / 100);

        const totalValueWithoutGD = sumTotalValuewithoutGD(bills.result);
        setTotalValuewithoutGDRes(Math.round(totalValueWithoutGD * 100) / 100);

        const totalCompensatedEnergyAmount = sumTotalCompensatedEnergyAmount(bills.result);
        setTotalCompensatedEnergyAmountRes(Math.round(totalCompensatedEnergyAmount * 100) / 100);

        const sortedData = sortByReferTo(bills.result);

        const groupedEletricEnergyQuantity = groupAndSumTotalEletricEnergyQuantityByMonthYear(sortedData);
        const groupedEletricAmountQuantity = groupAndSumTotalEletricEnergyAmountByMonthYear(sortedData);

        const totalEletricEnergyQuantity = groupedEletricEnergyQuantity.map(element => element.total_eletric_energy_quantity);
        setTotalEletricEnergyQuantityByMonth(totalEletricEnergyQuantity as any);

        const totalEletricEnergyAmount = groupedEletricAmountQuantity.map(element => element.total_amount);
        setTotalEletricEnergyAmountByMonth(totalEletricEnergyAmount as any);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const handleSearch = async (value:any) => {
    try {
      const response = await fetch('http://localhost:3000/api/bill/find-client-number', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ client_number: value })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();

      regenerateAllData(data.result)
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
  };

  const regenerateAllData = (updatedBills:any) => {
    const energyConsuption = sumEnergyConsuption(updatedBills);
    setEnergyConsuptionRes(Math.round(energyConsuption * 100) / 100);
  
    const energyCompensatedQuantity = sumEnergyCompensatedQuantity(updatedBills);
    setEnergyCompensateQuantitydRes(Math.round(energyCompensatedQuantity * 100) / 100);
  
    const totalValueWithoutGD = sumTotalValuewithoutGD(updatedBills);
    setTotalValuewithoutGDRes(Math.round(totalValueWithoutGD * 100) / 100);
  
    const totalCompensatedEnergyAmount = sumTotalCompensatedEnergyAmount(updatedBills);
    setTotalCompensatedEnergyAmountRes(Math.round(totalCompensatedEnergyAmount * 100) / 100);
  
    const sortedData = sortByReferTo(updatedBills);
  
    const groupedEletricEnergyQuantity = groupAndSumTotalEletricEnergyQuantityByMonthYear(sortedData);
    const groupedEletricAmountQuantity = groupAndSumTotalEletricEnergyAmountByMonthYear(sortedData);
  
    const totalEletricEnergyQuantity = groupedEletricEnergyQuantity.map(element => element.total_eletric_energy_quantity);
    setTotalEletricEnergyQuantityByMonth(totalEletricEnergyQuantity as any);
  
    const totalEletricEnergyAmount = groupedEletricAmountQuantity.map(element => element.total_amount);
    setTotalEletricEnergyAmountByMonth(totalEletricEnergyAmount as any);
  };
  
  const handleChange = (event:any) => {
    const { value } = event.target;
    setQuery(value);
    handleSearch(value); 
  };

  return (
    <Grid container spacing={3}>
      <Grid lg={12}>
        <IconButton sx={{ p: '10px' }} aria-label="menu">
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Pesquisar numero do cliente"
          inputProps={{ 'aria-label': 'search google maps' }}
          value={query}
          onChange={handleChange}
  
        />
        <IconButton disabled type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>

      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <EnergyConsunption diff={12} trend="up" sx={{ height: '100%' }} value={energyConsuptionRes} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalValueWithoutGD sx={{ height: '100%' }} value={totalValuewithoutGDRes} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <EnergyCompensated diff={16} trend="down" sx={{ height: '100%' }} value={energyCompensateQuantitydRes} />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCompensatedEnergyGDAmount sx={{ height: '100%' }} value={totalCompensatedEnergyAmountRes} />
      </Grid>

      <Grid lg={6}>
        <BarChart
          title="Energia Total Consumida"
          chartSeries={[
            { name: 'Total Kwh Mes', data: totalEletricEnergyQuantityByMonth },
          ]}
          typeData={"Kw/h"}
          sx={{ height: '100%' }}
        />
      </Grid>
      <Grid lg={6}>
        <BarChart
          title="Valor Total Gasto"
          chartSeries={[
            { name: 'This year', data: totalEletricEnergyAmountByMonth },
          ]}
          typeData={"R$ "}
          sx={{ height: '100%' }}
        />
      </Grid>

    </Grid>
  );
}

function sumEnergyConsuption(bills: Bill[]) {
  return bills.reduce((accumulator: number, currentValue: Bill) => accumulator + currentValue.eletric_energy_quantity + currentValue.energy_SCEE_without_ICMS_quantity, 0)
}

function sumEnergyCompensatedQuantity(bills: Bill[]) {
  return bills.reduce((accumulator: number, currentValue: Bill) => accumulator + currentValue.energy_compensated_GD_I_quantity, 0)
}

function sumTotalValuewithoutGD(bills: Bill[]) {
  return bills.reduce((accumulator: number, currentValue: Bill) => accumulator + parseFloat(currentValue.eletric_energy_amount) + parseFloat(currentValue.energy_SCEE_without_ICMS_amount) + parseFloat(currentValue.contribution_public_ilum), 0)
}

function sumTotalCompensatedEnergyAmount(bills: Bill[]) {
  return bills.reduce((accumulator: number, currentValue: Bill) => accumulator + parseFloat(currentValue.energy_compensated_GD_I_amount), 0)
}

function parseDate(refer_to: string) {
  const months:any = {
    'JAN': 1, 'FEV': 2, 'MAR': 3, 'ABR': 4, 'MAI': 5, 'JUN': 6,
    'JUL': 7, 'AGO': 8, 'SET': 9, 'OUT': 10, 'NOV': 11, 'DEZ': 12
  };

  const [monthStr, yearStr] = refer_to.split('/');
  const month = months[monthStr];
  const year = parseInt(yearStr, 10);

  return new Date(year, month - 1); 
}

function sortByReferTo(arr: Bill[]) {
  return arr.sort((a, b) => (parseDate(a.refer_to) as any) - (parseDate(b.refer_to) as any));
}


function groupAndSumTotalEletricEnergyQuantityByMonthYear(arr: any[]) {
  const result: { [key: string]: number } = {};

  arr.forEach(item => {
    const { refer_to, eletric_energy_quantity } = item;
    if (result[refer_to]) {
      result[refer_to] += eletric_energy_quantity;
    } else {
      result[refer_to] = eletric_energy_quantity;
    }
  });

  return Object.keys(result).map(key => ({
    refer_to: key,
    total_eletric_energy_quantity: result[key]
  }));
}

function groupAndSumTotalEletricEnergyAmountByMonthYear(arr: any[]) {
  const result: { [key: string]: { eletric_energy_quantity: number; total_amount: number; } } = {};

  arr.forEach(item => {
    const { refer_to, eletric_energy_quantity, eletric_energy_amount, energy_SCEE_without_ICMS_amount, contribution_public_ilum } = item;
    const eletric_energy_amount_float = parseFloat(eletric_energy_amount);
    const energy_SCEE_without_ICMS_amount_float = parseFloat(energy_SCEE_without_ICMS_amount);
    const contribution_public_ilum_float = parseFloat(contribution_public_ilum);

    if (result[refer_to]) {
      result[refer_to].eletric_energy_quantity += eletric_energy_quantity;
      result[refer_to].total_amount += eletric_energy_amount_float + energy_SCEE_without_ICMS_amount_float + contribution_public_ilum_float;
    } else {
      result[refer_to] = {
        eletric_energy_quantity,
        total_amount: eletric_energy_amount_float + energy_SCEE_without_ICMS_amount_float + contribution_public_ilum_float
      };
    }
  });

  return Object.keys(result).map(key => ({
    refer_to: key,
    total_eletric_energy_quantity: result[key].eletric_energy_quantity,
    total_amount: result[key].total_amount.toFixed(2)
  }));
}

