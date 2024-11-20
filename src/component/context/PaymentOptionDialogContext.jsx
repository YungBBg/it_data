import { createContext, useContext, useState } from 'react'
import PaymentOptionDialog from '/src/component/MainContent/Cart/CheckoutPage2/PaymentOptionDialog'
import { PaymentOptionFormProvider } from './PaymentOptionFormContext'

const PaymentOptionDialogContext = createContext({
    openPaymentOptionDialog: () => { },
    closePaymentOptionDialog: () => { },
})

export function usePaymentOptionDialog() {
    return useContext(PaymentOptionDialogContext)
}

export function PaymentOptionDialogProvider({ children }) {

    const [isOpenDialog, setIsOpenDialog] = useState(false)

    const openPaymentOptionDialog = () => setIsOpenDialog(true)
    const closePaymentOptionDialog = () => setIsOpenDialog(false)


    return (
        <PaymentOptionDialogContext.Provider
            value={{
                openPaymentOptionDialog,
                closePaymentOptionDialog,
            }}>
            {children}
            <PaymentOptionFormProvider>
            <PaymentOptionDialog isOpenDialog={isOpenDialog} />
            </PaymentOptionFormProvider>
        </PaymentOptionDialogContext.Provider>
    )
}