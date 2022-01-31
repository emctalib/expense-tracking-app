import React, { useEffect, useLayoutEffect } from 'react';

export const Kid = () => {
    useEffect(() => {
        console.log("→ Kid Component rendered (useEffect).");
    }, []);
    useLayoutEffect(() => {
        console.log("→ Kid Component rendered (useLayoutEffect).");
    }, []);
    return <div>→ Kid Component rendered.</div>;
};
