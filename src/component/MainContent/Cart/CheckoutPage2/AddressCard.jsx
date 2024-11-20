import * as React from 'react';
import { Button, Stack, Typography, Box, Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAddressForm } from '../../../context/AddressFormContext';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';

export default function AddressCard({id}) {
    const theme = useTheme();
    const { closeAddressForm, delAddressCard, cardQty } = useAddressForm();

    return (
        <Card variant="outlined" sx={{ padding: 1.5, margin: [1, 1], borderRadius: 2, ':hover': { boxShadow: theme.palette.mode === 'dark' ? '0 2px 14px 0 rgb(33 150 243 / 10%)' : '0 2px 14px 0 rgb(32 40 45 / 8%)' } }}>
            <Stack direction='row' justifyContent="space-between">
                <Typography marginleft={1.5} variant="h6">Address{id}</Typography>
                <Stack direction="row" spacing={1}>
                    <Button marginleft={1.5} variant="contained"  sx={{ color:"#322805", bgcolor: '#fec81a',  ":hover": { bgcolor: "#feda66" } }} onClick={closeAddressForm}>Select</Button>
                    {(cardQty > 1) ?
                        <Button marginleft={1.5} variant='outlined' onClick={delAddressCard} color='error'>
                            <DeleteTwoToneIcon />
                        </Button>
                        : 
                        null
                    }
                </Stack>
            </Stack>
            <Stack direction='row' width={"50%"} justifyContent="space-between" marginBottom={0.5}>
                <Typography marginleft={1.5} variant="subtitle2" >sky wong</Typography>
                <Typography marginleft={1.5} variant="subtitle2">Tel:98761234</Typography>
            </Stack>
            <Typography marginleft={1.5} variant="body2">IVE TM, 19 Ching Wun Road, NT</Typography>
        </Card>
    )
}