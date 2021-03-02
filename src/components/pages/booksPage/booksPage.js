import React, { Component } from 'react';
import ItemList from '../../itemList/itemList'
import gotService from '../../../services/gotServices';
import ErrorMessage from '../../errorMessage/errorMessage';
import {withRouter} from 'react-router-dom'; // может оборачивать другие компоненты, чтобы предоставить какие-то свойства


class BooksPage extends Component {

    gotService = new gotService();

    state = {
        // selectedBook: null,
        error: false
    }

    // onItemSelected = (id) => { // принимаем id - куда мы кликнули, функция поместит id в текущий state
    //     this.setState({
    //         selectedBook: id
    //     })
    // }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render() {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        // const itemList = (
        //     <ItemList onItemSelected={this.onItemSelected}
        //     getData={this.gotService.getAllBooks}
        //     renderItem={({name, released}) => `${name} (${released})`}/>
        // )

        // const bookDetails = (
        //     <CharDetails itemId={this.state.selectedBook}
        //     getData={this.gotService.getBook}>
        //         <Field field='numberOfPages' label='NumberOfPages'/>
        //         <Field field='publisher' label='Publisher'/>
        //         <Field field='released' label='Released'/>

        //     </CharDetails>

        // )

        return ( // передаем новый компонент и два пропса в него
            <ItemList onItemSelected={(itemId) => {
                this.props.history.push(itemId) // передаем путь к странице, на которую перейдем после клика
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name, released}) => `${name} (${released})`}/>
        )
    }





}

export default withRouter(BooksPage); // сразу получает match, history, location