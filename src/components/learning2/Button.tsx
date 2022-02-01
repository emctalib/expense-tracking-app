import React, { FC } from 'react';

interface Props {
    onChangeTitle: Function;
    children: React.ReactNode;
}

const Button: FC<Props> = ({ onChangeTitle, children }) => {
    console.log("Button [" + children + "] loaded.");
    return <>
        <button onClick={(e) => onChangeTitle(e)}>{children}</button>
    </>;
};


export default React.memo(Button);
//export default Button;