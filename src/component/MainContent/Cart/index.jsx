import React from 'react';

import { Button, Step, Stepper, StepLabel, Stack } from '@mui/material';

import PaymentForm from './CheckoutPage2/index';
import CheckoutPage1 from '/src/component/MainContent/Cart/CheckoutPage1';
import CheckoutPage3 from '/src/component/MainContent/Cart/CheckoutPage3';
import CheckoutPage4 from '/src/component/MainContent/Cart/checkoutPage4';

import { AddressFormProvider } from '../../context/AddressFormContext';

// step options
const steps = ['Cart List', 'Payment Detail', 'Review your order'];

function getStepContent(step) {
    switch (step) {
        case 0:
            return (
                <CheckoutPage1 />
            );
        case 1:
            return (
                <AddressFormProvider>
                    <PaymentForm />
                </AddressFormProvider>
            );
        case 2:
            return (
                <AddressFormProvider>
                    <CheckoutPage3 />
                </AddressFormProvider>
            )
        default:
            throw new Error('Unknown step');
    }
}

const Checkout = () => {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    return (
        <>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5, color: '#fec816' }}>
                {steps.map((label) => (
                    <Step key={label} >
                        <StepLabel StepIconProps={{ style: { color: '#fec816', } }}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <>
                {activeStep === steps.length ? (
                    <>
                        <CheckoutPage4 />
                        <Stack direction="row" justifyContent="flex-end">
                            <Button variant="contained" color="warning" href={'/RestaurantList'} sx={{ my: 3, ml: 1, color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }}>
                            Next Order
                            </Button>
                        </Stack>
                    </>
                ) : (
                    <>
                        {getStepContent(activeStep)}

                        <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                            {activeStep !== 0 && (
                                <Button variant="contained" onClick={handleBack} sx={{ my: 3, ml: 1, color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }}>
                                    Back
                                </Button>
                            )}
                            <Button variant="contained" onClick={handleNext} sx={{ my: 3, ml: 1, color: "#322805", bgcolor: '#fec81a', ":hover": { bgcolor: "#feda66" } }}>
                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                            </Button>
                        </Stack>
                    </>
                )}
            </>
        </>
        // </MainCard>
    );
};

export default Checkout;
