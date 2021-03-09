import React, {useState, useEffect} from 'react';
import './itemList.css';
import Spinner from '../spinner/spinner';
// import ErrorMessage from '../errorMessage/errorMessage';
// здесь мы собираем список персонажей

function ItemList ({getData, onItemSelected, renderItem})  {

    const [itemList , updateList] = useState([]);

    useEffect(() => {
        getData() // функция с уровня выше
        .then(updateList) // привязан котекст вызова - поэтому рез вызова не зависит от места вызова
        // .then((data) => {
        //     updateList(data)
        // })
            
            
            //     updateList(data) // изменяем стейт, который лежит в itemList
            // })
    }, []) // принимает второй аргумент, что делать, если стейт не изменился
    // передаем пустой массив - это говорит хуку, что эффект необходимо выполнить только при появлении или исчезновении компонента


    // componentDidCatch(){
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    // function onError(status){ // передаем статус ошибки
    //     this.setState({
    //         itemList: null,
    //         error: true
    //     })
    // }

    function renderItems(arr){
        return arr.map((item) => { // перебираем массив объектов - это и есть те объекты, которые мы помещаем на страницу
            const {id} = item;  //  вытаскиваем свойства из каждого объекта
            // в верстке используем имя каждого объекта и его id, чтобы указывать, куда мы кликаем
            const label = renderItem(item); // в нашу функцию из пропса передаем объект со свойтвом, которое интересно нам    
            return (
                    <a class="list-group-item list-group-item-action" 
                    key={id} data-bs-toggle="list" href="#" 
                    role="tab" aria-controls="profile" 
                    onClick={() => onItemSelected(id)}>{label}
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

    


        // if (error){
        //     return <ErrorMessage/>
        // }

        if(!itemList){
            return <Spinner/>
        }

        const items = renderItems(itemList);

        return (
             <div class="list-group" id="list-tab" role="tablist">
                 {items}
            </div>
        );
}

export default ItemList;

