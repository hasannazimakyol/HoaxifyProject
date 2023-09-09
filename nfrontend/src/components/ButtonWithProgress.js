import React from 'react';

const ButtonWithProgress = (props) => {

<<<<<<< HEAD
    const{ onClick, pendingApiCall, disabled, text } = props;
    
    return (
        <button className='btn btn-primary' onClick={onClick} disabled={disabled}>
=======
    const{ onClick, pendingApiCall, disabled, text, className } = props;
    // || ile className varsa onu eğer yoksa sağdaki string değeri alır
    return (
        <button className={className || 'btn btn-primary'} onClick={onClick} disabled={disabled}>
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
            {pendingApiCall && <span className='spinner-border spinner-border-sm'></span>} {text}
        </button>
    );
};

export default ButtonWithProgress;