import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Expenses } from './components/expense/Expenses';
import Login from './components/Login';
import { Register } from './components/Register';
import { NoPage } from './components/NoPage';
import { Layout } from './components/Layout';
import { Logoff } from './components/Logoff';
import { LoginUserInfo } from './data/common';
import { Route, Routes, BrowserRouter, NavLink, Link } from 'react-router-dom';
import { Home } from './components/Home';


function App() {
  const currentUser = new LoginUserInfo(1, "John Amy", "john@example.com");

  return (
    <>
      <main className="flex-shrink-1">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="expense" element={<Expenses />} />
              <Route path="login" element={<Login loggingIn={false} />} />
              <Route path="logoff" element={<Logoff />} />
              <Route path="register" element={<Register />} />
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
