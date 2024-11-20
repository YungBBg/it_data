import { createContext, useContext, useState } from 'react'
import PaymentOptionForm from '/src/component/MainContent/Cart/CheckoutPage2/PaymentOptionForm'
const PaymentOptionFormContext = createContext({
    openPaymentOptionForm: () => { },
    closePaymentOptionForm: () => { },
})

export function usePaymentOptionForm() {
    return useContext(PaymentOptionFormContext)
}

export function PaymentOptionFormProvider({ children }) {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [formName, setFormName] = useState("Cash");
    const closePaymentOptionForm = () => setIsOpenForm(false)
    function openPaymentOptionForm(name){
        console.log(name)
        setFormName(name)
        setIsOpenForm(true);
        
    }

    return (
        <PaymentOptionFormContext.Provider
            value={{
                openPaymentOptionForm,
                closePaymentOptionForm,
            }}>
            {children}
            <PaymentOptionForm isOpenForm={isOpenForm} formName={formName}/>
        </PaymentOptionFormContext.Provider>
    )
}