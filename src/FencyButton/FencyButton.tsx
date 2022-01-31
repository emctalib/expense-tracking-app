import React, { FC } from 'react';
import './FencyButton.css';

interface Props {
    label: string;
    isDisabled: boolean,
    disabledText: string

}
const FencyButton: FC<Props> = ({ label, isDisabled, disabledText }) => {
    return <>
        <input data-testid="buttonid" className="btn btn-primary btn-lg btn-g fency" type="submit" disabled={isDisabled} value={isDisabled ? disabledText : label} />
    </>;
};


export default FencyButton;