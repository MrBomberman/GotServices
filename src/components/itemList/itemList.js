import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotServices';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
// здесь мы собираем список персонажей

export default class ItemList extends Component {


    gotService = new gotService();

    state = {
        charList: null,
        error: false
    }

    componentDidMount(){
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({ // получим список персонажей со страницы
                    charList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            charList: null,
            error: true
        })
    }

    onError(status){ // передаем статус ошибки
        this.setState({
            charList: null,
            error: true
        })
    }

    renderItems(arr){
        return arr.map((item) => { // перебираем массив объектов
            const {id, name} = item;  //  вытаскиваем свойства из каждого объекта
            // в верстке используем имя каждого объекта и его id, чтобы указывать, куда мы кликаем
            return (
                    <a class="list-group-item list-group-item-action" 
                    id={id} data-bs-toggle="list" href="#list-profile" 
                    role="tab" aria-controls="profile" 
                    onClick={() => this.props.onCharSelected(id)}>{name}
                    </a>
            )
        })
    }
//     // <a class="list-group-item list-group-item-action" 
//     // id={i} data-bs-toggle="list" href="#list-profile" 
//     // role="tab" aria-controls="profile" 
//     // onClick={() => this.props.onCharSelected(i)}>{item.name}
//     // </a>

// /* <li 
// key={id}
// className="list-group-item" 
// onClick={() => this.props.onCharSelected(id)}>{name}
// </li>  */

    render() {

        const {charList, error} = this.state;

        if (error){
            return <ErrorMessage/>
        }

        if(!charList){
            return <Spinner/>
        }

        const items = this.renderItems(charList);

        return (
             <div class="list-group" id="list-tab" role="tablist">
                 {items}
            </div>
        );
    }


}