import React, {useEffect, useState} from 'react';
import './itemDetails.css';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';

// выбранный id передается в этот компонент, который нам собирает карточку персонажа

function Field ({item,field, label}){ // элемент, который образим на странице(объект, одно из свойсв которого мы вытащим при помощи field), поле, и как подписать это поле
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span><strong>{label}</strong></span>
            <span>{item[field]}</span>
        </li>
    )
}
export {
    Field
}

export default function ItemDetails ({getData, itemId, children }) {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);




    useEffect(() => {
        getData(itemId)
        .then(setItem)//  передаем ответ нашей функции, которая принимает объект и меняет наш стейт
        .catch(() => setError(true)) // при возникновении ошибки вызываем функцию
        .finally(setLoading(false))
        // в которой по условию объекта не будет, но бдует отменчена ошибка
    // this.foo.itemId();

    if (!itemId) { // если id не был передан, мы вообще ничего не будем делать
        return;
    }

    // this.setState({ // во время обновление компонента ставим стейт загрузки в тру
    //     loading: true
    // })

        
    }, [item]);

    // useEffect(() => {
    //     return setLoading(false)
    // }, [loading])


        
    if (!item && error) { // если объект пуст и возникла ошибка то выдаем сообщение об ошибке
            return <ErrorMessage/>
        } else if (!item) { // если просто не выбран персонаж просим его выбрать
            return <span className="select-error">Please select an item</span>
        }

    if (loading) { // если происходит момент загружки - показываем спиннер
            return (
                <div>
                    <Spinner/>
                </div>
            )
        }


    return (
            <div className="char-details rounded">
                <h4>{item.name}</h4>
                <ul  className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
        // берем все свойтсва из объекта, который  к нам придет от сервера
        // обрабатываем всех детей в компоненте плюс перебираем объект

}

