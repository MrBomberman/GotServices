import React from 'react';
import RandomChar from './randomChar';
import {shallow} from 'enzyme';
import { HashRouter } from 'react-router-dom';

// глобальное описание - отдельный блок тестов, который тестирует какую-то часть
// на проверку визуального отображение компонента
describe('Testing <RandomChar/>', () => { // функция будет выполнять те тесты, который мы напишем
    const char = shallow(<RandomChar/>); // создаем копию компонента
    describe('Testing snap and state', () => {

        it('RandomChar have rendered correctly', () => {
            expect(char).toMatchSnapshot(); // после запуска - будет создан снимок компонента и в дальнейшем
            // когда наши тесты будут проводиться, этот снимок будет сравниваться с тем оригиналом , тот, который был изначально получен, если что-то не совпадает, вылетит ошибка
            // потом либо фиксить баги , либо исправлять наш снимок
        });
    
        it('RandomChar state "char" is empty object', () => { // проверяем стейт объекта
            expect(char).toBeObject() // получаем стейт компонента и проверяем - объект ли это
            // expect(char.state().char).toBeObject() -  для классовых компонентов
        });
    
        // it('RandomChar state "loading" is true', () => {
        //     // expect(char.state().loading).toBeTruthy()
        // })
        // it('RandomChar state "error" is false', () => {
        //     // expect(char.state().error).toBeFalsy()
        // })
    })
    // describe('Handlers tests', () => { // здесь тестируем функции и обработчики событий
    //     it('testing onCharLoaded', () => { // для классового компонента
    //         char.instance().onCharLoaded(); // используем экземпляр нашего компонента
    //         expect(char.state().loading).toBeFalsy(); // ожидаем, что onCharLoaded переведет стейт в false
    //     })
    // });
    //     it('testing onError', () => { // для классового компонента
    //         char.instance().onError(); // используем экземпляр нашего компонента
    //         expect(char.state().loading).toBeFalsy(); 
    //         expect(char.state().error).toBeTruthy(); // проверяем на ошибку, сразу несколько стейтов необходимо, так как несколько меняется из-за ошибки
    //     })

})