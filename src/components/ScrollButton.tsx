import React, { useState } from 'react';

import { FaArrowCircleUp } from 'react-icons/fa';
import styled from 'styled-components';

const ScrollButton = () => {

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {

        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            // console.log("scroll-v..");
            setVisible(true)
        }
        else if (scrolled <= 300) {
            //  console.log("scroll-f.." + scrolled);
            setVisible(false)
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <Button>
            <FaArrowCircleUp onClick={scrollToTop}
                style={{ display: visible ? 'inline' : 'none' }} />
        </Button>
    );
}

export const Heading = styled.h1`
   text-align: center;
   color: green;
`;

export const Content = styled.div`
   overflowY: scroll;
   height: 2500px;
`;

export const Button = styled.div`
   position: fixed; 
   width: 100%;
   left: 50%;
   bottom: 40px;
   height: 20px;
   font-size: 3rem;
   z-index: 1;
   cursor: pointer;
   color: green;
   `

export default ScrollButton;