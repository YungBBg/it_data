// material-ui
import { Box, Button, Checkbox, FormControlLabel, Grid, TextField, Typography, Card, Stack, Radio, RadioGroup, Dialog, DialogTitle, DialogContent, Divider, Zoom } from '@mui/material';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';

// import Grid from '@mui/material/Unstable_Grid2/Grid2';

import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { NumericFormat, NumberFormatBase, PatternFormat } from 'react-number-format';
import { usePaymentOptionDialog } from '../../../context/PaymentOptionDialogContext';
import { usePaymentOptionForm } from '../../../context/PaymentOptionFormContext';
// import { FaCcMastercard, FaCcVisa, FaPaypal } from 'react-icons/fa6'
import { FaCcMastercard, FaCcVisa, FaPaypal } from 'react-icons/fa6'


const CardExpiry = (props) => {
    const format = (val) => {
        if (val === '') return '';
        let month = val.substring(0, 2);
        const year = val.substring(2, 4);

        if (month.length === 1 && month[0] > 1) {
            month = `0${month[0]}`;
        } else if (month.length === 2) {
            // set the lower and upper boundary
            if (Number(month) === 0) {
                month = `01`;
            } else if (Number(month) > 12) {
                month = '12';
            }
        }

        return `${month}/${year}`;
    };

    return <NumberFormatBase {...props} format={format}
        color='warning'
        id="expDate"
        label="Expiry date"
        variant="outlined"
        fullWidth
        required
        customInput={TextField}
        defaultValue={"1230"}
    />;
}

export default function PaymentOptionForm({ isOpenForm, formName }) {
    const { closePaymentOptionForm } = usePaymentOptionForm()
    const { closePaymentOptionDialog } = usePaymentOptionDialog()

    return (
        <Dialog
            open={isOpenForm}
            onClose={closePaymentOptionForm}
            scroll={"paper"}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogContent dividers={scroll === 'paper'} >

                <Typography variant="h6" marginBottom={1}>
                    <Box spacing={1} display={'flex'} >
                        <Box sx={{ marginTop: 0.5, marginRight: 1 }}>
                            {formName === 'VISA' ? (
                                <FaCcVisa size={24} />
                            ) : formName === 'Master' ? (
                                <FaCcMastercard size={24} />
                            ) : <FaPaypal size={24} />
                            }
                        </Box>
                        <Typography variant='h6' component='div' gutterBottom>
                            {formName}
                        </Typography>
                    </Box>
                </Typography>

                <Grid container spacing={3}>
                    {/* card name */}
                    <Grid item xs={12} md={6}>
                        <TextField
                            color='warning'
                            fullWidth
                            required
                            id="cardName"
                            label="Name on card"
                            variant="outlined"
                            defaultValue={"Sky Wong"}
                        />
                    </Grid>

                    {/* card number */}
                    <Grid item xs={12} md={6}>
                        <PatternFormat
                            color='warning'
                            id="cardNumber"
                            label="Card number"
                            variant="outlined"
                            fullWidth
                            required
                            customInput={TextField}
                            format="#### #### #### ####"
                            defaultValue={"5408456412311159"}
                        />
                    </Grid>

                    {/* expiry date */}
                    <Grid item xs={12} md={6}>
                        <CardExpiry />
                    </Grid>

                    {/* cvv */}
                    <Grid item xs={12} md={6}>
                        <PatternFormat
                            color='warning'
                            id="cvv"
                            label="CVV"
                            variant="outlined"
                            fullWidth
                            customInput={TextField}
                            format="###"
                            defaultValue={"888"}
                        />
                    </Grid>

                    <Grid item xs={12} display={'flex'} justifyContent={'flex-end'}>
                        <Button variant='contained' sx={{ color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }} onClick={closePaymentOptionForm}>
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
};