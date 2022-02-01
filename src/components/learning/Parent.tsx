import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Kid } from './Kid';

export const Parent = () => {
  const [count, setCounter] = useState<number>(0);

  useEffect(() => {
    console.log("→ Parent Component rendered (useEffect).");
    console.log("Counter: " + count)
  }, [count]);
  useLayoutEffect(() => {
    console.log("→ Parent Component rendered (useLayoutEffect).");
  }, []);
  return (
    <React.Fragment>
      → Parent Component rendered.<br></br>
      <button onClick={() => setCounter((c) => c + 1)}>+</button>&nbsp;
      <button onClick={() => setCounter((c) => c - 1)}>-</button>&nbsp;
      Counter: {count}<br></br><br></br>
      <Kid></Kid>
    </React.Fragment>
  );
};
