import React, {Component} from 'react';
import ItemList from '../../itemList/itemList';
import ItemDetails,{Field} from '../../itemDetails/itemDetails';
import ErrorMessage from '../../errorMessage/errorMessage';
import gotService from '../../../services/gotServices';
import RowBlock from '../../rowBlock/rowBlock'

export default class CharacterPage extends Component{
    
    gotService = new gotService();
    state = {
        selectedChar:  Math.floor(Math.random()* 10 +6),
        error: false
    }

    onItemSelected = (id) => { // принимаем id - куда мы кликнули, функция поместит id в текущий state
        this.setState({
            selectedChar: id
        })
    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    render(){

        if (this.state.error) {
            return <ErrorMessage/>
        }


    const itemList = (
        <ItemList onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllCharacters}
        renderItem={({name, gender}) => `${name} (${gender})`}/>
    )
        // во внутрь передали два компонента, для того, чтобы их отобразить мы создали их внутри файла charDetails
        // фукнцию, которая возвращает верстку  и этот компонент использует props для того, чтобы отобразить нужную нам строчку
        // с данными - ему необходимо знать про элемент персонажа, которого мы хотим отобразить
        // необходимо поле, которое нужно отобразить и также необходимо label - само отбражение на экране - что-то из api, а что-то из label
        // все пропрсы приходят из Field который мы передаем как ребенка в наш компонент charDetails
        // чтобы использовать api нам необходмио преобразовать детей, который прихоядт в этот компонент
        // также мы указываем каждого персонажа и его поля, который к нам пришел из api
    const charDetails = (
        <ItemDetails itemId={this.state.selectedChar}
        getData={this.gotService.getChatacter}>
            <Field
            field='gender'
            label='Gender'/>
            <Field
            field='born'
            label='Born'/>
            <Field
            field='died'
            label='Died'/>
            <Field
            field='culture'
            label='Culture'/>
        </ItemDetails> 
    )

    return ( // передаем новый компонент и два пропса в него
        <RowBlock
        left={itemList}
        right={charDetails}/>
    )
    }
}