import { useContext, createContext, useState } from "react";

//Define context type
interface ThemeContextType {
  theme: string;
  font: string;
  setTheme: (theme: string) => void;
  setFont: (font: string) => void;
}

//Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

//Create Provider Component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<string>("light");
  const [font, setFont] = useState<string>("sans-serif");

  const contextValue: ThemeContextType = {
    theme,
    font,
    setTheme,
    setFont,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

//Create context hook for theme context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext must be used within its provider.");
  }
  return context;
};
