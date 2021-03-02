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
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import BooksItem from '../pages/booksPage/booksItem'

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
            <Router>
                <div className='app'> 
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

                        <Route path='/characters' component={CharacterPage}/>
                        <Route path='/houses' component={HousesPage}/>
                        <Route path='/books' exact component={BooksPage}/>
                        <Route path='/books/:id' render={
                            ({match}) => {
                                const {id} = match.params; // вытаскиваем id страницы
                            return <BooksItem bookId={id}/>
                            }
                        }/>
                    </Container>
                </div>
            </Router>
        );
    }
};


