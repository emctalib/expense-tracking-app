import React, { FC, Suspense } from 'react';
import { ExpenseContainer } from './components/expense/ExpenseContainer';
import Login from './components/Login';
import { Register } from './components/Register';
import { NoPage } from './components/NoPage';
import { Layout } from './components/Layout';
import { Logoff } from './components/Logoff';
import { Route, Routes, BrowserRouter, NavLink, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { Planner } from './components/planner/Planner';
import ProtectedRoute from './ProtectedRoute';
import { TodoContainer } from './components/todo/TodoContainer';
import { Family } from './components/learning/Family';
import { Home as Learning2 } from './components/learning2/Home';
import ErrorHome from './components/learning3/ErrorHome';

interface SiteRoutesProps {
    isLoggedIn: boolean;
}

export const SiteRoutes: FC<SiteRoutesProps> = ({ isLoggedIn }) => {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout isLoggedIn={isLoggedIn} />} >
                        <Route index element={<ProtectedRoute isAuthenticated={isLoggedIn} component={Home} />} />
                        <Route path='home' element={<ProtectedRoute isAuthenticated={isLoggedIn} component={Home} />} />
                        <Route path='expense' element={<ProtectedRoute isAuthenticated={isLoggedIn} component={ExpenseContainer} />} />

                        <Route path="login" element={(isLoggedIn ? <Home /> : <Login />)} />
                        <Route path="logoff" element={(isLoggedIn ? <Logoff /> : <Login />)} />
                        <Route path="register" element={(isLoggedIn ? <Home /> : <Register />)} />
                        <Route path="todo" element={(isLoggedIn ? <TodoContainer /> : <Login />)} />
                        <Route path="planner" element={(isLoggedIn ? <Planner /> : <Login />)} />
                        <Route path="family" element={(isLoggedIn ? <Family /> : <Login />)} />
                        <Route path="learning2" element={(isLoggedIn ? <Learning2 /> : <Login />)} />
                        <Route path="errorhome" element={(isLoggedIn ? <ErrorHome /> : <Login />)} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default SiteRoutes;
