import React, { useCallback, useState } from 'react';
import Title from './Title';
import Button from './Button';
import Footer from './Footer';
import { Home2 } from './Home2';

export const Home = () => {
    const [title1, setTitle1] = useState<string>("Start 1");
    const [title2, setTitle2] = useState<string>("Start 2");

    //useCallback: useCallback will return a memoized version of the callback that only changes if one of the dependencies has changed. Pass an inline callback and an array of dependencies

    // Following function onTitle1Change,onTitle2Change will always call when title changed for anyone because react think there is change. so we can use callback instead.
    /*
     const onTitle1Change = () => {
         setTitle1((p) => p + ". Title# 1 Changed");
     }
 
     const onTitle2Change = () => {
         setTitle2((p) => p + ". Title# 2 Changed");
     }
 */

    const onTitle1Change = useCallback(() => {
        setTitle1((p) => p + ". Title# 1 Changed");
        //setTitle1("Title #1 changed.");
    }, [title1]);

    const onTitle2Change = useCallback(() => {
        //setTitle2("Title #2 changed.");
        setTitle2((p) => p + ". Title# 2 Changed");
    }, [title2]);

    return (
        <>
            <h5>
                Look at the Console. [Title1] and [Title2] will render everytime even not change. so use the Pure Component
            </h5>
            <Title name={title1} type='Type1'></Title>
            <Button onChangeTitle={() => onTitle1Change()}>Button 1</Button>


            <Title name={title2} type='Type2'></Title>
            <Button onChangeTitle={onTitle2Change}>Button 2</Button>
            <Footer></Footer>


            <hr></hr>
            <Home2></Home2>
        </>
    )
};

//https://www.youtube.com/watch?v=iFdGhHVXS9Q
//https://www.youtube.com/watch?v=xkWQTEdfTWI