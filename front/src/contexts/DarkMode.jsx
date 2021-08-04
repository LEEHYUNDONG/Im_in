import React, { createContext,useState } from "react";

const DarkModeContext = createContext({
    isDark: false, 
    dark_state: () => {},
});

const DarkModeProvider = ({children}) => {
    const [isDark,setisDark] = useState(false);
    const dark_state = {
        on: () => setisDark(true),
        off: () => setisDark(false)
      };

    const value = {isDark, dark_state}
    return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>
};

export {DarkModeContext,DarkModeProvider}