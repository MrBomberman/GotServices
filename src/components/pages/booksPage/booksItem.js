import React, { Component } from 'react';
import gotService from '../../../services/gotServices';
import ItemDetails, {Field}  from '../../itemDetails/itemDetails';


export default class BooksItem extends Component{
    gotService = new gotService();




    render() {
        return (
            <ItemDetails itemId={this.props.bookId}
            getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>

            </ItemDetails>
        )
    }

}