import React, {Component} from 'react';
import './itemDetails.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

// выбранный id передается в этот компонент, который нам собирает карточку персонажа

const Field = ({item,field, label}) => { // элемент, который образим на странице(объект, одно из свойсв которого мы вытащим при помощи field), поле, и как подписать это поле
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span><strong>{label}</strong></span>
            <span>{item[field]}</span>
        </li>
    )
}
export {
    Field
}

export default class ItemDetails extends Component {



    state = {
        item: null,
        loading: true,
        error: false
    }

    componentDidMount() {
        this.updateChar(); // вызываем эту функцию в момент обновления свойств компонента
    }

    componentDidUpdate(prevProps){ // предыдущие пропсы из компонента, можно их использовать чтобы проверить на соответсвие текущих props
        if (this.props.itemId !== prevProps.itemId){ // проверяем текущий пропс на совпадение с предыдущим
            this.updateChar();
        }
    }

    onCharDetailsLoaded = (item) => { // принимаем объект и отменяем наш спиннер
        this.setState({
            item,
            loading: false
        })
    }

    updateChar() {
        const {getData} = this.props

        const {itemId} = this.props;
        if (!itemId) { // если id не был передан, мы вообще ничего не будем делать
            return;
        }

        this.setState({ // во время обновление компонента ставим стейт загрузки в тру
            loading: true
        })

        getData(itemId)
            .then(this.onCharDetailsLoaded) //  передаем ответ нашей функции, которая принимает объект и меняет наш стейт
            .catch(() => this.onError()) // при возникновении ошибки вызываем функцию
            // в которой по условию объекта не будет, но бдует отменчена ошибка
            // this.foo.itemId();
    }

    onError(){
        this.setState({
            item: null,
            error: true
        })
    }


    render() {

        if (!this.state.item && this.state.error) { // если объект пуст и возникла ошибка то выдаем сообщение об ошибке
            return <ErrorMessage/>
        } else if (!this.state.item) { // если просто не выбран персонаж просим его выбрать
            return <span className="select-error">Please select a character</span>
        }

        if (this.state.loading) { // если происходит момент загружки - показываем спиннер
            return (
                <div>
                  <Spinner/>   
                </div>
            )
        
        }

        const {item} = this.state; // берем весь наш объект из стейта
        const  {name} =item; // берем все свойтсва из объекта, который  к нам придет от сервера
        // обрабатываем всех детей в компоненте плюс перебираем объект
        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
    }
}

