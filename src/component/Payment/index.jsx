import { PaymentOptionFormProvider } from '../context/PaymentOptionFormContext';
import PaymentInfo from './PaymentInfo'

export default function Payment() {

    return (
        <>
            <PaymentOptionFormProvider>
                <PaymentInfo />
            </PaymentOptionFormProvider>
        </>
    )
}