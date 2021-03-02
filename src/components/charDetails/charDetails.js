import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotServices';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

// выбранный id передается в этот компонент, который нам собирает карточку персонажа

const Field = ({char,field, label}) => { // элемент, который образим на странице(объект, одно из свойсв которого мы вытащим при помощи field), поле, и как подписать это поле
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span><strong>{label}</strong></span>
            <span>{char[field]}</span>
        </li>
    )
}
export {
    Field
}

export default class CharDetails extends Component {


    gotService = new gotService();

    state = {
        char: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar(); // вызываем эту функцию в момент обновления свойств компонента
    }

    componentDidUpdate(prevProps){ // предыдущие пропсы из компонента, можно их использовать чтобы проверить на соответсвие текущих props
        if (this.props.charId !== prevProps.charId){ // проверяем текущий пропс на совпадение с предыдущим
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (char) => { // принимаем объект и отменяем наш спиннер
        this.setState({
            char,
            loading: false
        })
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) { // если id не был передан, мы вообще ничего не будем делать
            return;
        }

        this.setState({ // во время обновление компонента ставим стейт загрузки в тру
            loading: true
        })

        this.gotService.getChatacter(charId)
            .then(this.onCharDetailsLoaded) //  передаем ответ нашей функции, которая принимает объект и меняет наш стейт
            .catch(() => this.onError()) // при возникновении ошибки вызываем функцию
            // в которой по условию объекта не будет, но бдует отменчена ошибка
            // this.foo.charId();
    }

    onError(){
        this.setState({
            char: null,
            error: true
        })
    }


    render() {

        if (!this.state.char && this.state.error) { // если объект пуст и возникла ошибка то выдаем сообщение об ошибке
            return <ErrorMessage/>
        } else if (!this.state.char) { // если просто не выбран персонаж просим его выбрать
            return <span className="select-error">Please select a character</span>
        }

        if (this.state.loading) { // если происходит момент загружки - показываем спиннер
            return (
                <div>
                  <Spinner/>   
                </div>
            )
        
        }

        const {char} = this.state; // берем весь наш объект из стейта
        const  {name} = char; // берем все свойтсва из объекта, который  к нам придет от сервера
        // обрабатываем всех детей в компоненте плюс перебираем объект
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {char})
                        })
                    }
                </ul>
            </div>
        );
    }
}

