import { createContext, useContext, useState } from "react"
import AddressForm from "/src/component/MainContent/Cart/CheckoutPage2/AddressForm"

const AddressFormContext = createContext({
    openAddressForm:()=>{},
    closeAddressForm:()=>{},

    openAddressCard:()=>{},
    createAddressCard:()=>{},
    delAddressCard:()=>{},

})


export const useAddressForm = ()=>{
    return useContext(AddressFormContext)
}

export function AddressFormProvider({ children }){
    const [isOpen, setIsOpen] = useState(false)
    const [isOpenCard, setIsOpenCard] = useState(false)
    const [cardQty, setCardQty] = useState(1)
    
    function openAddressForm(){
        setIsOpen(true)
    }

    function closeAddressForm(){
        setIsOpen(false)
        setIsOpenCard(false)

    }

    function openAddressCard(){
        if(!isOpenCard){
            setIsOpenCard(true)
        }
    }

    function createAddressCard(){
        setIsOpenCard(false)
        setCardQty(cardQty + 1)
    }

    function delAddressCard(){
        setCardQty(cardQty - 1)
    }

    return (
        <AddressFormContext.Provider
            value={{
                openAddressForm,
                closeAddressForm,
                openAddressCard,
                createAddressCard,
                delAddressCard,
                cardQty,
            }}
        >
            {children}
            <AddressForm isOpen={isOpen} isOpenCard={isOpenCard} cardQty={cardQty}/>
        </AddressFormContext.Provider>
    )
}