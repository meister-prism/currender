import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import styled from 'styled-components';
import App from './App';
import store from './Store';

// サイズ固定のため配置している
const BackGround = styled.div`
    width: 1080px
    height: 1920px
    background-color: #87ceeb
    position: fixed
    overflow: hidden
    top: 0
    left: 0
`;

ReactDOM.render(
    <Provider store={store}>
        <BackGround>
            <App />
        </BackGround>
    </Provider>,
    document.getElementById('root'),
);
