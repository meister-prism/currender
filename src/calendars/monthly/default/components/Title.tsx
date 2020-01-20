import * as React from 'react';
import styled from 'styled-components';
import logo from '../../../../assets/sun.png';

interface Props {
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

const NewsBox = styled.span`
    width: 100%
    border-radius: 3px
    border: 1px solid grey
    display: block
    margin: 0 0 1em
    padding: 0 5px
`;

const Temp = styled.span`
    font-size: 30px
    padding: 5px 0
`;

const HighTemp = styled.span`
    color: red
    padding: 0 0.5em
`;

const RowTemp = styled.span`
    color: blue
    padding: 0 0.5em
`;

const News = styled.span`
    width: 40%
    display: block
    margin: 2em 1em
    float: right
`;


export function Title(props: Props): JSX.Element {
    const { Month, MonthName } = props;
    return (
        <Root>
            <Bar />
            <TitleBox>
                <TitleText>{Month}</TitleText>
                <h1>{MonthName}</h1>
            </TitleBox>
            <News>
                <img src={String(logo)} alt="weather" style={{ width: '70px' }} />
                <Temp>
                    <HighTemp>20</HighTemp>
                    /
                    <RowTemp>15</RowTemp>
                    ℃
                </Temp>
                <p>今日はCO2の日です．息を吸いましょう．</p>
                <NewsBox>
                    <p>遅延情報</p>
                </NewsBox>
                <NewsBox>
                    <p>ニュース</p>
                </NewsBox>
            </News>
        </Root>
    );
}
