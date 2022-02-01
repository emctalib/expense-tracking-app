import React, { useEffect, useLayoutEffect } from 'react';
import { GrandParent } from './GrandParent';

export const Family = () => {
    useEffect(() => {
        console.log("→ Family Component rendered (useEffect).");
    }, []);
    useLayoutEffect(() => {
        console.log("→ Family Component rendered (useLayoutEffect).");
    }, []);

    return (
        <React.Fragment>
            → Family Component rendered.<br></br><br></br>
            <GrandParent></GrandParent>
        </React.Fragment>
    );
};
