import ShippingOption from './ShippingOption'
import OrderSummary from '/src/component/MainContent/Cart/OrderSummary';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import PaymentOption from './PaymentOption';
import { PaymentOptionDialogProvider } from '/src/component/context/PaymentOptionDialogContext';
import { PaymentOptionFormProvider } from '/src/component/context/PaymentOptionFormContext';

export default function Payment() {
    const [fee, setFee] = React.useState(50);
    const handleFee = (value) => {
        console.log(value)
        setFee(value)
    }
    return (
        <>
            <ShippingOption fee={fee} handleFee={handleFee} />

            <Grid maxWidth={415.89} >
                <PaymentOptionFormProvider>
                    <PaymentOptionDialogProvider>
                        <PaymentOption />
                    </PaymentOptionDialogProvider>
                </PaymentOptionFormProvider>
            </Grid>

            <Grid item xs={12}>
                <OrderSummary fee={fee} />
            </Grid>
        </>
    )
}