import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotServices';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
// import PropTypes from 'prop-types';

export default class RandomChar extends Component {


    gotService = new gotService(); // каждый раз будет создаваться новый сервис

    state = { // задаем состояния компонента
        char: {}, // изначально у нас просто пустой объект, который  в будущем заполнится данными с нашего сервера
        loading: true,
        error: false // указываем состояние ошибки в компоненте
    }

    static defaultProps = { // установили дефолтный прос прям внутри компонента
        interval: 2000 // ставим дефолтный пропс, в случае, если его даже не передали, компонент все равно отработает
    }

    componentDidMount() { // формируем в хуке действия с функцией, когда прилоежние уже зарендерилось
        this.updateChar(); // когда будем создан наш класс, у него будет вызван этот метод
        this.timerId = setInterval(this.updateChar, this.props.interval);
    }

    componentWillUnmount() { // вызывается до удаления домструктуры со страницы
        clearInterval(this.timerId);
    }

    onCharLoaded = (char) => { // используя this мы ссылаемся на определнный экземпляр объекта, в котором мы работаем
        this.setState({
            char,
            loading: false //  как только персонаж загрузиться - лоадинг будет отменен
        }) // напрямую устанавливаем наш объект , так как нам не важно, какое было имя до этого
    }

    onError = (err) => {
        this.setState({
            error: true,
            loading: false
        })
    }
    // чтобы не было проблем с контекстом мы делаем стрелочную функцию
    updateChar = () => { // каждый раз, когда персонаж будет загружаться - он будет обновлять свой стейт
        const id = Math.floor(Math.random()*170 + 25); // получаем рандомное число от 25 до 140 диапазон персонажей
        // const id = 122222222222222222;
        this.gotService.getChatacter(id) // используем наш сервис, обращаясь к одному из его методов
            .then(this.onCharLoaded) // получаем данные от сервера уже преобразованные нашей функцией
            .catch(this.onError); // выполнится тогда, когда произойдет ошибка в промисе

    }

    render() { // если рендер видит return - то прекращает работать
        console.log('render');
        const {char, loading, error} = this.state; // деструктурируем наш стейт уже как объект
        
        // if (loading){ // если наш компонент еще закгружается - вернем спиннер
        //     return <Spinner/>
        // }

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
}

// RandomChar.defaultProps = {
//     interval: 2000
// }

// RandomChar.propTypes = { // проверяем типы данных у наших props
//     interval: PropTypes.number // также проверяет число ли наш интервал
    

// }
// (props,propName, componentName) => { // props - список всех props, которые пришли в компонент
//         // propName - имя определенного пропса
//         // componentName - имя самого компонента
//         const value = props[propName]; // получаем текущее значени интервала
        
//         if (typeof value === 'number'  && !isNaN(value)) { // проверяем число ли
//             return null
//         }
//         return new TypeError(`${componentName}: ${propName} must be a number`)
//     }


const View = ({char}) => { // создаем локальный компонент
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