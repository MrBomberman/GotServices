import React, { Component } from 'react';
import gotService from '../../../services/gotServices';
import CharDetails, {Field}  from '../../charDetails/charDetails';


export default class BooksItem extends Component{
    gotService = new gotService();




    render() {
        return (
            <CharDetails itemId={this.props.bookId}
            getData={this.gotService.getBook}>
                <Field field='numberOfPages' label='NumberOfPages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>

            </CharDetails>
        )
    }

}