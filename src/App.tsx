import React, { useEffect, useRef, useState } from 'react';
import './App.css';

import { LoginUserInfo } from './slices/common';
import { useSelector, useDispatch } from 'react-redux';
import { AlreadyLogin as AlreadyLoginServ } from './services/authentication';
import { RootState } from './slices/store';
import SiteRoutes from './SiteRoutes';

function App() {
  //const isCompLoaded = useRef<boolean>(false);
  const [isCompLoaded, setIsCompLoaded] = useState<boolean>(false);
  const dispatch = useDispatch();
  const currentUser = new LoginUserInfo(1, "John Amy", "john@example.com");
  const { isLoggedIn } = useSelector((state: RootState) => state.authenticationSlice);

  useEffect(() => {
    AlreadyLoginServ(dispatch);
    setIsCompLoaded(true);
  }, [])

  return (
    <>
      <main className="flex-shrink-1">
        {isCompLoaded ? <SiteRoutes isLoggedIn={isLoggedIn} /> : "wait...."}
      </main>
      <footer className="footer mt-auto py-3 bg-dark">
        <span className="text-muted text-right">@Copyright 2022.</span>
      </footer>
    </>
  );
}

export default App;
