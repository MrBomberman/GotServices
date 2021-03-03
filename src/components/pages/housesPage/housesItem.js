import React, { Component } from 'react';
import gotService from '../../../services/gotServices';
import ItemDetails, {Field}  from '../../itemDetails/itemDetails';

export default class HousesItem extends Component{
    gotService = new gotService();




    render() {
        return (
            <ItemDetails itemId={this.props.houseId}
            getData={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='AncestralWeapons'/>

            </ItemDetails>
        )
    }

}