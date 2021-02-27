import React, {Component} from 'react';
import './charDetails.css';
import gotService from '../../services/gotServices';



export default class CharDetails extends Component {


    gotService = new gotService();

    state = {
        char: null
    }

    componentDidMount() {
        this.updateChar(); // вызываем эту функцию в момент обновления свойств компонента
    }

    componentDidUpdate(prevProps){ // предыдущие пропсы из компонента, можно их использовать чтобы проверить на соответсвие текущих props
        if (this.props.charId !== prevProps.charId){ // проверяем текущий пропс на совпадение с предыдущим
            this.updateChar();
        }
    }

    updateChar() {
        const {charId} = this.props;
        if (!charId) { // если id не был передан, мы вообще ничего не будем делать
            return;
        }

        this.gotService.getChatacter(charId)
            .then((char) => {
                this.setState({char}) //  записываем ответ от сервера в наше состояние
            })
        // this.foo.charId();
    }

    render() {

        if (!this.state.char) {
            return <span className='select-error'>Please select a character</span>
        }

        const {name, gender, born, died, culture} = this.state.char; // берем все свойтсва из объекта, который  к нам придет от сервера

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
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
            </div>
        );
    }
}