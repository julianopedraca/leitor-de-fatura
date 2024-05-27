import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import type { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import OfflineBoltIcon from '@mui/icons-material/OfflineBolt';

export interface TotalCustomersProps {
  diff?: number;
  trend: 'up' | 'down';
  sx?: SxProps;
  value: number;
}

export function EnergyCompensated({ diff, trend, sx, value }: TotalCustomersProps): React.JSX.Element {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }} spacing={3}>
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
              Energia Compensada
              </Typography>
              <Typography variant="h4">{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} Kw/h</Typography>
            </Stack>
            <Avatar sx={{ backgroundColor: 'var(--mui-palette-success-main)', height: '56px', width: '56px' }}>
              <OfflineBoltIcon />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
