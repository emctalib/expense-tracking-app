import React, { FC } from 'react';

interface Props {
    type: string;
    name: string;
}

const Title: FC<Props> = ({ type, name }) => {
    console.log("Title with type " + type + " and name " + name + " loaded.");
    return <>
        {name}
    </>;
};

export default React.memo(Title)
//export default Title;