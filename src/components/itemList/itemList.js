import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
// здесь мы собираем список персонажей

export default class ItemList extends Component {



    state = {
        itemList: null,
        error: false
    }

    componentDidMount(){
        const {getData} = this.props // получаем функцию с уровня выше getAllCharacters  в данной ситуации

        getData() // функция с уровня выше
            .then((itemList) => {
                this.setState({ // получим список персонажей со страницы
                    itemList,
                    error: false
                });
            })
            .catch(() => {this.onError()});
    }

    componentDidCatch(){
        this.setState({
            itemList: null,
            error: true
        })
    }

    onError(status){ // передаем статус ошибки
        this.setState({
            itemList: null,
            error: true
        })
    }

    renderItems(arr){
        return arr.map((item) => { // перебираем массив объектов - это и есть те объекты, которые мы помещаем на страницу
            const {id} = item;  //  вытаскиваем свойства из каждого объекта
            // в верстке используем имя каждого объекта и его id, чтобы указывать, куда мы кликаем
            const label = this.props.renderItem(item); // в нашу функцию из пропса передаем объект со свойтвом, которое интересно нам    
            return (
                    <a class="list-group-item list-group-item-action" 
                    id={id} data-bs-toggle="list" href="#list-profile" 
                    role="tab" aria-controls="profile" 
                    onClick={() => this.props.onItemSelected(id)}>{label}
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

        const {itemList, error} = this.state;

        if (error){
            return <ErrorMessage/>
        }

        if(!itemList){
            return <Spinner/>
        }

        const items = this.renderItems(itemList);

        return (
             <div class="list-group" id="list-tab" role="tablist">
                 {items}
            </div>
        );
    }


}