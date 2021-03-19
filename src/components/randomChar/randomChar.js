import React, {Component, useEffect, useState} from 'react';
import './randomChar.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
// import PropTypes from 'prop-types';

export default function RandomChar ({getData}){

    const [char, setChar] = useState({});
    const [loading , setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charId , setCharId] = useState(Math.floor(Math.random()* 20 + 130))

    // state = { // задаем состояния компонента
    //     char: {}, // изначально у нас просто пустой объект, который  в будущем заполнится данными с нашего сервера
    //     loading: true,
    //     error: false // указываем состояние ошибки в компоненте
    // }

    // static defaultProps = { // установили дефолтный прос прям внутри компонента
    //     interval: 2000 // ставим дефолтный пропс, в случае, если его даже не передали, компонент все равно отработает
    // }
    
    useEffect(() => {
        let interval = setInterval(() => {
            setCharId(Math.floor(Math.random()* 20 + 130))
        }, 1500)
        return () => clearInterval(interval)
    }, []) // создаем отдельный эффект под таймаут, число будет генерироваться каждый 1.5 секунды


    useEffect(() => {
        
        // const id = Math.floor(Math.random()*170 + 25); // получаем рандомное число от 25 до 140 диапазон персонажей

        
        getData(charId) // используем наш сервис, обращаясь к одному из его методов
            .then(setChar) // получаем данные от сервера уже преобразованные нашей функцией
            .catch(() => setError(true)) // выполнится тогда, когда произойдет ошибка в промисе
            .then(() => setLoading(false))
        
        
            // setInterval(async () => {
            //     await getData(id) // используем наш сервис, обращаясь к одному из его методов
            //     .then(setChar) // получаем данные от сервера уже преобразованные нашей функцией
            //     .catch(() => setError(true)) // выполнится тогда, когда произойдет ошибка в промисе
            //     .then(() => setLoading(false))
                
                
            //   }, 1000)
            
            
            
    }, [charId])

       





        const errorMessage = error ? <ErrorMessage/> : null; //  проверяеам наличие ошибки 
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null ; // если загрузка есть -  ставим спиннер
        
        return ( // как только загрузиться объект  - спиннер отменится
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    
}



function View ({char}) { // создаем локальный компонент
    const {name, gender, born, died, culture} = char;
    
    return (
        <>
            <h4>Random character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Gender</strong></span>
                    <span>{gender}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Born</strong></span>
                    <span>{born}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Died</strong></span>
                    <span>{died}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span><strong>Culture</strong></span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}