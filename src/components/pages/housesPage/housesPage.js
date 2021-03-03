import React, { Component } from 'react';
import ItemList from '../../itemList/itemList'
import ItemDetails,{Field} from '../../itemDetails/itemDetails'
import gotService from '../../../services/gotServices';
import ErrorMessage from '../../errorMessage/errorMessage';
import RowBlock from '../../rowBlock/rowBlock'

export default class HousesPage extends Component {
    gotService = new gotService();

    state = { 
        selectedHouse: null,
        error: false
    }

    onItemSelected = (id) => { // принимаем id - куда мы кликнули, функция поместит id в текущий state
        this.setState({
            selectedHouse: id
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render() {
        
        if(this.state.error) {
            return <ErrorMessage/>
        }


        const itemList = (
            <ItemList onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem={({name, region}) => `${name} (${region})`}/>
        )


        const houseDetails = (
            <ItemDetails itemId={this.state.selectedHouse}
            getData={this.gotService.getHouse}>
                <Field field='region' label='Region'/>
                <Field field='words' label='Words'/>
                <Field field='titles' label='Titles'/>
                <Field field='overlord' label='Overlord'/>
                <Field field='ancestralWeapons' label='AncestralWeapons'/>

            </ItemDetails>
        )

        return (
            <RowBlock
            left={itemList}
            right={houseDetails}/>
        )

    }
}