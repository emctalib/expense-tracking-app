import React, { useState, useCallback, useEffect } from 'react';

export const Home2 = () => {

    const [number1, setNumber1] = useState<number>(0);
    const [number2, setNumber2] = useState<number>(0);

    const [result, setResult] = useState(0);
    useEffect(() => {
        console.log("Home2 Compnent: loaded. Input Number1: " + number1 + " Number2: " + number2 + " Result: " + result);
    }, [number1, number2, result]);

    const addNumbers = () => {
        setResult(number1 + number2);
        console.log("Home2 Compnent: number added " + result + " .");
    }

    const memoizedAddNumbers = useCallback(() => {
        //this is the cached version result. it will show old value because function is not actually executed. when same dependency
        setResult(number1 + number2);
        console.log("Home2 Compnent: number added " + result + " .");
    }, [number1, number2, result]);

    return <>
        <h2>callBack hook test</h2>
        <input type="text" onChange={(e) => setNumber1(+e.target.value)} />&nbsp;
        <input type="text" onChange={(e) => setNumber2(+e.target.value)} />&nbsp;
        <button onClick={addNumbers}>Click to Add (no callback hook)</button>&nbsp;
        <button onClick={memoizedAddNumbers}>Click to Add (with callback hook)</button>
        <h4>Result: {result}</h4>
    </>;
}
