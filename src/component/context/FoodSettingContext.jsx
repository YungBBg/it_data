import { createContext, useContext, useState } from "react"
import { FoodSetting } from "../MainContent/RestaurantList/FoodSetting"

const FoodSettingContext = createContext({
    openFoodSetting: (id) => {},
    closeFoodSetting: () => {},
})

export function useFoodSetting() {
    return useContext(FoodSettingContext)
}

export function FoodSettingProvider({ children }) {
    const [isOpenFoodSetting, setIsOpenFoodSetting] = useState(false)
    const [foodID, setFoodID] = useState(1)

    function openFoodSetting(id){
        setFoodID(id)
        setIsOpenFoodSetting(true)
    }

    const closeFoodSetting = () => {
        setIsOpenFoodSetting(false)
    }

    return (
        <FoodSettingContext.Provider
            value={{
                openFoodSetting,
                closeFoodSetting,
            }}
        >
            {children}
            <FoodSetting isOpenFoodSetting={isOpenFoodSetting} foodID={foodID}/>
        </FoodSettingContext.Provider>
    )

}