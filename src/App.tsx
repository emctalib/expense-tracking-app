import React, { useEffect, useRef, useState, createContext } from 'react';
import './App.css';

import { LoginInfo, SiteTheme } from './slices/common';
import { useSelector, useDispatch } from 'react-redux';
import { AlreadyLogin as AlreadyLoginServ, CheckAlreadyLogin } from './services/authentication';
import { RootState } from './slices/store';
import SiteRoutes from './SiteRoutes';
import ThemeProvider from './ThemeProvider';

function App() {
  //const isCompLoaded = useRef<boolean>(false);
  const [isCompLoaded, setIsCompLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<LoginInfo>({ fullName: "", token: "", isLoggedIn: false } as LoginInfo)
  const { isLoggedIn } = useSelector((state: RootState) => state.authenticationSlice);
  const UserContext = createContext(null);
  const initTheme = SiteTheme.classic;
  const saveUser = (value: LoginInfo) => {
    setCurrentUser(value)
  }

  const saveUser1 = (value: LoginInfo) => {
    setCurrentUser(value)
  }
  useEffect(() => {
    AlreadyLoginServ(dispatch);
    let user = CheckAlreadyLogin();
    if (user !== undefined && user !== null) {
      setCurrentUser(user);
    }

    setIsCompLoaded(true);
  }, [])

  return (
    <>
      <main className="flex-shrink-1">
        <ThemeProvider theme={initTheme}>
          {isCompLoaded ? <SiteRoutes isLoggedIn={isLoggedIn} /> : "wait...."}
        </ThemeProvider>
      </main>

    </>
  );
}

export default App;
