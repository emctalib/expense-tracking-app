import React, { useEffect, useLayoutEffect, useState } from 'react';

export const Kid = () => {
    const [count, setCounter] = useState<number>(0);

    useEffect(() => {
        console.log("→ Kid Component rendered (useEffect).");
        console.log("Counter: " + count)
    }, [count]);

    useLayoutEffect(() => {
        console.log("→ Kid Component rendered (useLayoutEffect).");
    }, []);
    return (
        <>→ Kid Component rendered.<br></br>
            <button onClick={() => setCounter((c) => c + 1)}>+</button>&nbsp;
            <button onClick={() => setCounter((c) => c - 1)}>-</button>&nbsp;
            Counter: {count}
        </>);
};
