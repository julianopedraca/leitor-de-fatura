import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import BoltIcon from '@mui/icons-material/Bolt';

export interface BudgetProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: number;
}

export function EnergyConsunption({ diff, trend, sx, value }: BudgetProps): React.JSX.Element {

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
              Cons. de Energia Elétrica 
              </Typography>
              <Typography variant="h4">{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Kw/h</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-primary-main)', height: '56px', width: '56px' }}>
              <BoltIcon />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
