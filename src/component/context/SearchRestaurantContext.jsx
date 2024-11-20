import { createContext, useContext, useState } from 'react'

const SearchRestaurantContext = createContext({
    handleKeyWord: (word) => { },
    word:'',
})

export function useSearchRestaurant() {
    return useContext(SearchRestaurantContext)
}

export function SearchRestaurantProvider({ children }) {
    const [keyWord, setKeyWord] = useState('')
    const handleKeyWord = (value) => setKeyWord(value)
    const word = keyWord

    return (
        <SearchRestaurantContext.Provider
            value={{
                handleKeyWord,
                word,
            }}>
            {children}
        </SearchRestaurantContext.Provider>
    )
}