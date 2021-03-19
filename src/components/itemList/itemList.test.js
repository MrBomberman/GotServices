import React from 'react';
import ItemList from './itemList';
import {mount} from 'enzyme';
import gotService from '../../services/gotServices'
// для классовых компонентов
// describe('Testing <ItemList/>', () => {
//     const service = new gotService();
//     const list = mount(<ItemList
//     getData={service.getAllHouses}
//     renderItem={(name) => name}/>); // отдает промис - не устанавливает стейт, а также просто рендерим имена, котоыре нас интересуют

//     it('Click on itemList must rerender all list in one instance', () => {
//         list.setState({itemList: [{name: 'adf', id: 1}, {name: 'adf', id: 2}]}); // при помощи библиотеки enzyme мы установили наш кастомный стейт
//         list.find('.list-group-item:fist-child').simulate('click'); // получаем первый элемент рендера в компоненте, также имитируем клик
//         expect(list.find('div').toHaveLength(1))
//     })

// })