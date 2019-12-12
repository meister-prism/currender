import * as React from 'react';
import styled from 'styled-components';

interface Props {
    Date: string,
    Time: string,
    Month: string,
    MonthName: string,
}

/* styled-component の使い方
    基本タグを選んで（ex: 下はdiv）cssを付け足す
    function内で変数宣言すると，propsを使ったスタイリングができるけど...？
*/
const Root = styled.div`
    width: 1024px
    margin: 0 auto
    background-color: #f3f3f3
    text-align: left
`;

export function Title(props: Props): JSX.Element {
    const { Date, Time, Month, MonthName } = props;
    return (
        <Root>
            <span>
                <h1>{Month}</h1>
                <p>{MonthName}</p>
            </span>
        </Root>
    );
}
