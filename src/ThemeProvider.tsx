import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import { SiteTheme } from './slices/common';

const initState = SiteTheme.light;
const ThemeContext = createContext<[SiteTheme, React.Dispatch<any>]>([
  initState, () => { }
]);

type Props = {
  theme: SiteTheme,
};
export const ThemeProvider: React.FC<Props> = ({ theme, children }) => {
  const [currentTheme, setCurrentTheme] = useState<SiteTheme>(theme)

  return <>
    <ThemeContext.Provider value={[currentTheme, setCurrentTheme]}>
      {children}
    </ThemeContext.Provider>
  </>;
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("Context not defined.");
  }
  return context;
};