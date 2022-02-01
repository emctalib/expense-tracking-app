import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Parent } from './Parent';

export const GrandParent = () => {
    const [text1, setText1] = useState<string>("Start>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    const [loading1, setLoading1] = useState<boolean>(false);

    const [text2, setText2] = useState<string>("Start<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
    const [loading2, setLoading2] = useState<boolean>(false);

    useEffect(() => {
        console.log("→ Grand Parent Component rendered (useEffect).");
        setText1("End");
        setLoading1(true);

    }, []);
    useLayoutEffect(() => {
        console.log("→ Grand Parent Component rendered (useLayoutEffect).");
        setText2("End");
        setLoading2(true);
    }, []);
    console.log("GrandParent called");
    return (
        <React.Fragment>
            → Grand Parent Component rendered.<br></br>
            useEffect: {text1 + ""}: ({loading1 ? "Yes" : "No"})<br></br>
            useLayoutEffect: {text2 + ""}: ({loading2 ? "Yes" : "No"})<br></br><br></br>
            <Parent></Parent>
        </React.Fragment>
    );
};
