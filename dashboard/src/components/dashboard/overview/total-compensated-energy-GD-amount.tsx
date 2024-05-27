import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PaidIcon from '@mui/icons-material/Paid';

export interface TotalProfitProps {
  sx?: SxProps;
  value: number;
}

export function TotalCompensatedEnergyGDAmount({ value, sx }: TotalProfitProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
            Economia GD
            </Typography>
            <Typography variant="h4">R$ {new Intl.NumberFormat('pt-BR').format(value)}</Typography>
          </Stack>
          <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
            <PaidIcon />
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
}
