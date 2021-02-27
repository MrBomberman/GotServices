import React, {Component} from 'react';
import './itemList.css';
import gotService from '../../services/gotServices';
import Spinner from '../spinner/spinner';


export default class ItemList extends Component {


    gotService = new gotService();

    state ={
        charList: null
    }

    componentDidMount(){
        this.gotService.getAllCharacters()
            .then((charList) => {
                this.setState({ // получим список персонажей со страницы
                    charList
                })
            })
    }

    renderItems(arr){
        return arr.map((item, i) => {
            return (
                <a class="list-group-item list-group-item-action" 
                key={i} data-bs-toggle="list" href="#"
                role="tab" aria-controls="profile" 
                onClick={() => this.props.onCharSelected(41 + i)}>{item.name}
                </a>
            )
        })
    }
    // <a class="list-group-item list-group-item-action" 
    // id={i} data-bs-toggle="list" href="#list-profile" 
    // role="tab" aria-controls="profile" 
    // onClick={() => this.props.onCharSelected(i)}>{item.name}
    // </a>

/* <li 
key={i}
className="list-group-item" 
onClick={() => this.props.onCharSelected(i)}>{item.name}
</li> */

    render() {

        const {charList} = this.state;


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