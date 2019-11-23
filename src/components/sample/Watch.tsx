import * as React from 'react';
import styled from 'styled-components';

interface Props {
    Date: string,
    Time: string,
}

/* styled-component の使い方
    基本タグを選んで（ex: 下はdiv）cssを付け足す
    function内で変数宣言すると，propsを使ったスタイリングができるけど...？
*/
const Root = styled.div`
    width: 500px
    margin: 0 auto
    background-color: #f3f3f3
    text-align: center
`;

export function Watch(props: Props): JSX.Element {
    const { Date, Time } = props;
    return (
        <Root>
            <p>{Date}</p>
            <p>{Time}</p>
        </Root>
    );
}
