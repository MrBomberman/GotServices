import React, {Component} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import PropTypes from 'prop-types';
// здесь мы собираем список персонажей


class ItemList extends Component {


    static defaultProps = {
        onItemSelected: () => {}
    }
    
    static propTypes = {
        onItemSelected: PropTypes.func, // проверяем функция ли это
        // getData: PropTypes.arrayOf(PropTypes.object) // в getData должен быть массив, который состоит из объектов
    }



    componentDidCatch(){
        this.setState({
            data: null,
            error: true
        })
    }

    onError(status){ // передаем статус ошибки
        this.setState({
            data: null,
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
                    key={id} data-bs-toggle="list" href="#list-profile" 
                    role="tab" aria-controls="profile" 
                    onClick={() => this.props.onItemSelected(id)}>{label}
                    </a>
            )
        })
    }


    render() {

        const {data} = this.props;
        const items = this.renderItems(data);

        return (
             <div class="list-group" id="list-tab" role="tablist">
                 {items}
            </div>
        );
    }


}

const withData = (View) => {
    return class extends Component {

        state = {
            data: null,
            error: false
        }
    

        componentDidMount(){
            const {getData} = this.props // получаем функцию с уровня выше getAllCharacters  в данной ситуации
    
            getData() // функция с уровня выше
                .then((data) => {
                    this.setState({ // получим список персонажей со страницы
                        data,
                        error: false
                    });
                })
                .catch(() => {this.onError()});
        }

        render() {

            const {data, error} = this.state;

            if (error){
                return <ErrorMessage/>
            }
    
            if(!data){
                return <Spinner/>
            }

            return <View {...this.props} data={data}/>
        }
    }
}
export default withData(ItemList);