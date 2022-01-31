import React, { useEffect, useLayoutEffect } from 'react';
import { Parent } from './Parent';

export const GrandParent = () => {
    useEffect(() => {
        console.log("→ Grand Parent Component rendered (useEffect).");
    }, []);
    useLayoutEffect(() => {
        console.log("→ Grand Parent Component rendered (useLayoutEffect).");
    }, []);
    return (
        <React.Fragment>
            → Grand Parent Component rendered.<br></br>
            <Parent></Parent>
        </React.Fragment>
    );
};
