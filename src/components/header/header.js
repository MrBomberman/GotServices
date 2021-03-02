import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

const HeaderBlock = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
`;

const HeaderTitle = styled.h3`
    font-size: 24px;
    color: #fff;
    margin: 0;
`;

const HeaderLinks = styled.ul`
    display: flex;
    margin: 0;
    align-items: center;
    color: #fff;
    list-style-type: none;
    li {
        margin-right: 20px;
        font-size: 18px;
    }
`;

const Header = () => {
    return (
        <HeaderBlock>
            <HeaderTitle>
            <Link to="/" class="btn btn-primary">Game of throne</Link>
            </HeaderTitle>
            <HeaderLinks>
                <li>
                <Link to="/characters/" class="btn btn-primary">Characters</Link>
                </li>
                <li>
                <Link to="/houses/" class="btn btn-primary">Houses</Link>
                </li>
                <li>
                <Link to="/books/" class="btn btn-primary">Books </Link>  
                </li>
            </HeaderLinks>
        </HeaderBlock>
    );
};

export default Header;