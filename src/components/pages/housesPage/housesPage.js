import React, { Component } from 'react';
import ItemList from '../../itemList/itemList'
import gotService from '../../../services/gotServices';
import ErrorMessage from '../../errorMessage/errorMessage';
import {withRouter} from 'react-router-dom';

class HousesPage extends Component {
    gotService = new gotService();

    state = { 
        error: false
    }

    // onItemSelected = (id) => { // принимаем id - куда мы кликнули, функция поместит id в текущий state
    //     this.setState({
    //         selectedHouse: id
    //     })
    // }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render() {
        
        if(this.state.error) {
            return <ErrorMessage/>
        }


        return (
            <ItemList 
            onItemSelected={(itemId) => {
                this.props.history.push(itemId) // передаем путь к странице, на которую перейдем после клика
            }}
            getData={this.gotService.getAllHouses}
            renderItem={({name, region}) => `${name} (${region})`}/>
        )




    }
}

export default withRouter(HousesPage);