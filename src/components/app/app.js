import React, { Component } from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import './app.css';
import ErrorMessage from '../errorMessage/errorMessage'
import CharacterPage from '../characterPage/characterPage';
import gotService from '../../services/gotServices';
import BooksPage from '../pages/booksPage/booksPage';
import HousesPage from '../pages/housesPage/housesPage';

export default class App extends Component {

    gotService = new gotService();

    state = {
        showRandomChar: true,
        error: false,

    }

    componentDidCatch(){
        this.setState({
            error: true
        })
    }

    toggleRandomCharacter = () => {
        this.setState(state => {
            return {
                showRandomChar: !state.showRandomChar
            }
        });
    };



    render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }
        const char = this.state.showRandomChar ? <RandomChar/> : null;

        return (        
            <> 
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{size: 5, offset: 0}}>
                            {char}
                            <button type="button" class="btn btn-primary btn-lg"
                            onClick={this.toggleRandomCharacter}>
                            Toggle random character
                        </button>
                        </Col>
                    </Row>
                    <CharacterPage/>
                    <Row>
                    <BooksPage/>
                    </Row>
                    <Row>
                    <HousesPage/>
                    </Row>
                </Container>
            </>
        );
    }
};


