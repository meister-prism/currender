import React from 'react';
import styled from 'styled-components';
import Title from './containers/Title';
import Content from './containers/Content';

export default function monthlyDefault() {
    return (
        <Main>
            <Title />
            <Content />
        </Main>
    );
}

const Main = styled.div`
`;
