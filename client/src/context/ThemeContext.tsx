import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = 'light' | 'dark';

interface ContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext <ContextType | undefined>(undefined)


//TYPE UNDEFINED
export const useTheme = (): ContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error;
    }
    return context;
  };

export const ThemeProvider = ({children}: {children: React.ReactNode}) => {
    const [theme,setTheme] = useState<Theme>('light')

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme') as Theme;
        if (storedTheme) {
          setTheme(storedTheme);
          document.documentElement.setAttribute('data-theme', storedTheme);
        } else {
          document.documentElement.setAttribute('data-theme', 'light');
        }
      }, [theme]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        //document.documentElement.setAttribute('data-theme', theme);
    }

    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}