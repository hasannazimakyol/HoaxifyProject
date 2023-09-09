import React from "react";

const Input = (props) => {
<<<<<<< HEAD
const { label, error, name, onChange, type } = props;
const className = error ? "form-control is-invalid" : "form-control";
=======
    const { label, error, name, onChange, type, defaultValue } = props;

    let className = 'form-control';
    if (type === 'file') {
        className += '-file';
    }
    if (error !== undefined) {
        className += ' is-invalid'
    }
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35

    return (
        <div className='mb-3'>
            <label>{label}</label>
<<<<<<< HEAD
            <input className={className} name={name} onChange={onChange} type={type} />
=======
            <input className={className} name={name} onChange={onChange} type={type} defaultValue={defaultValue} />
>>>>>>> 1228ac1633a57b02e146b9c0c26cca9cd0f67b35
            <div className="invalid-feedback">{error}</div>
        </div>
    )
}

export default Input;