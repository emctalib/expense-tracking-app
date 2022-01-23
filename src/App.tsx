import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Expenses } from './components/expense/Expenses';
import Login from './components/Login';
import { Register } from './components/Register';
import { NoPage } from './components/NoPage';
import { Layout } from './components/Layout';
import { Logoff } from './components/Logoff';
import { LoginUserInfo } from './slices/common';
import { Route, Routes, BrowserRouter, NavLink, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { useSelector, useDispatch } from 'react-redux';
import { AlreadyLogin as AlreadyLoginServ } from './services/authentication';
import { RootState } from './slices/store';

function App() {
  const currentUser = new LoginUserInfo(1, "John Amy", "john@example.com");
  const { isLoggedIn } = useSelector((state: RootState) => state.authenticationSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    AlreadyLoginServ(dispatch);
  }, [])

  return (
    <>{isLoggedIn ? "TT" : "FF"}
      <main className="flex-shrink-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />} >
              <Route index element={(isLoggedIn ? <Home /> : <Login />)} />
              <Route path="expense" element={(isLoggedIn ? <Expenses /> : <Login />)} />
              <Route path="login" element={(isLoggedIn ? <Home /> : <Login />)} />
              <Route path="logoff" element={(isLoggedIn ? <Logoff /> : <Login />)} />
              <Route path="register" element={(isLoggedIn ? <Home /> : <Register />)} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </main>
      <footer className="footer mt-auto py-3 bg-dark">
        <span className="text-muted text-right">@Copyright 2022.</span>
      </footer>
    </>
  );
  /*
  return (
    <div className="App">
      <Expenses />
    </div>
  );*/
}

export default App;
