import React from 'react';
import {Col, Row} from 'reactstrap';

// создали отдельный блок, который рендерит элементы на странице, собирая сразу два элемента, при помощи пропс
// которые мы ему передаем


const RowBlock = ({left, right}) => { // из пропс достаем компоненты и собираем все в одной переменной, делая из нее компонент
    return (
    <Row>
        <Col md='6'>
        {left}
        </Col>
        <Col md='6'>
        {right}
        </Col>
    </Row>
    )
}

export default RowBlock;