import * as React from 'react';
import styled from 'styled-components';
import logo from '../assets/sun.png';

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

const Bar = styled.div`
    width: 100%
    height: 20px
    margin: 0 auto
    background-color: #000
`;

const Root = styled.div`
    width: 100%
    margin: 0 auto
    background-color: #f3f3f3
    text-align: left
`;

const TitleBox = styled.span`
    width: 40%
    padding: 10px 20px
    float: left
`;

const TitleText = styled.h1`
    font-size: 100px
    margin: 0
`;



export function Title(props: Props): JSX.Element {
    const { Date, Time, Month, MonthName } = props;
    return (
        <Root>
            <Bar/>
            <TitleBox>
                <TitleText>{Month}</TitleText>
                <h2>{MonthName}</h2>
            </TitleBox>
        </Root>
    );
}
