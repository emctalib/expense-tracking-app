import React, { useEffect, useState } from 'react';
import { LogOff as LogOffServ } from '../services/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Navigate, useNavigate } from 'react-router-dom';



export const Logoff = () => {
    const dispatch = useDispatch();
    const [isLogedOff, setIsLogedOff] = useState<boolean>(false)
    const navigate = useNavigate()

    useEffect(() => {

        const timer = setTimeout(() => {
            LogOffServ(dispatch);
            setIsLogedOff(true);
            navigate("/login");
        }, 1000)

    }, []);

    return (
        <div>
            <h5>You are being loged off.....</h5>
        </div>
    )
}
