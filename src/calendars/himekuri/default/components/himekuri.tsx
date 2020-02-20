import * as React from 'react';
import styled from 'styled-components';

// このファイルのみで使うので export しない
interface Props {
    title: string,
}

// こっちは export する (without default)
// 返り値は JSX.Element だけど，推論が効くので書かなくて良い
export function TestHimekuri(props: Props) {
    const { title } = props;
    return (
        <Root>
            <Bar />
            <FlexBox>
                <Gallery>
                    <h1>04</h1>
                    <p>April</p>
                    <h2>レポート締め切り</h2>
                    <h3>14:00-15:00 ミーティング</h3>
                </Gallery>
                <Main>
                    <h1>2</h1>
                    <p>THU</p>
                </Main>
                <News>
                    <Temp>
                        <HighTemp>20</HighTemp>
                        /
                        <RowTemp>16</RowTemp>
                        ℃
                    </Temp>
                    <p>今日はCO₂の日です．息を吸いましょう．</p>
                    <NewsBox>
                        <p>[遅延情報]</p>
                    </NewsBox>
                    <NewsBox>
                        <p>[News]</p>
                    </NewsBox>
                </News>
            </FlexBox>
        </Root>
    );
}

const Root = styled.div`
    width: 1080px;
`;

const Bar = styled.div`
    width: 100%;
    height: 15px;
    margin: 0 auto;
    background-color: black;
`;

const FlexBox = styled.div`
    display: flex;
    background-color: #eee;
`;

const Gallery = styled.div`
    flex: 1;
    h1{
        font-size: 50px;
        margin: 45px 0px 0px 0px;
    }
    p{
        font-size: 25px;
        font-weight: 800;
        margin: 0px 0px 90px 0px;
    }
    h2{
        font-size: 20px;
        margin: 0px 0px 100px 0px;
    }
    h3{
        font-size: 14px;
        font-weight: 200;
    }
`;

const Main = styled.div`
    flex: 2;
    display: flex;
    flex-flow: column;
    justify-content: center;
    h1{
        font-size: 200px;
        height: 190px;
        font-family: 'Gulim';
        text-align: center;
        margin: 0px;
    }
    p{
        font-size: 30px;
        color: darkgray;
        text-align: center;
        margin: 0px;
    }
`;

const News = styled.div`
    flex: 1
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
`;

const Temp = styled.span`
    font-size: 30px;
    padding: 5px 0;
`;

const HighTemp = styled.span`
    color: tomato;
    padding: 0 0.5px;
`;

const RowTemp = styled.span`
    color: dodgerblue;
    padding: 0 0.5px;
`;

const NewsBox = styled.div`
    width: 95%;
    border: thin solid silver;
    border-radius: 3px;
    margin: 0 0 1em;
    padding: 0 5px;
    display: block;
    font-size: 10px;
`;
