import React from 'react';
import './errorMessage.css';
import img from './error.jpg';

const ErrorMessage = () => {
    return (
        <div>
        <img src={img} alt='error' ></img>
        <h1><strong>Something goes wrong</strong></h1>
        </div>
    )
}

export default ErrorMessage;