import { createContext, useReducer } from "react"
import { handleTheme } from "./reducer/ThemeReducer"
import { TOGGLE_THEME } from "./ActionTypes"

const initialstate = {
    Theme: "light"
}



export const ThemeContext = createContext()



 const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(handleTheme, initialstate)

    const themeToggle = (data) => {
        console.log(data);
        
        const NewTheme = data === 'light' ? 'dark' : 'light';

        dispatch({ type: TOGGLE_THEME, payload: NewTheme })

    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                themeToggle
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider