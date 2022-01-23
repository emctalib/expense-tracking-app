import React, { FC } from 'react';

interface LoadingSpinnerProps {
    isLoading: boolean;

}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ isLoading }) => {
    console.log("loading:" + isLoading)
    return (
        <div className='loadingPannelMargin'>
            <div className="d-flex flex-column align-items-center justify-content-center" >
                <div className="row">
                    <div className="spinner-border text-danger loadingPannel" role="status">
                        <span className="sr-only"></span>
                    </div>
                </div>
                <div className="row">
                    <strong className='text-danger'>Loading...</strong>
                </div>

            </div>
        </div>
    )
}

export default LoadingSpinner;
