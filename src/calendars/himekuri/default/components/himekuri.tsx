import * as React from 'react';
import styled from 'styled-components';
import logo from '../../../../assets/sun.png';

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
                    <h3>14:00-15:00 ミーティング 18:00-19:00 ミーティング</h3>
                </Gallery>
                <Main>
                    <h1>2</h1>
                    <p>THU</p>
                </Main>
                <News>
                    <Temp>
                        <img src={String(logo)} alt="weather" style={{ width: '70px' }} />
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
    height: 900px;
    background-color: tomato;
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
    height: 100%;
`;

const Gallery = styled.div`
    flex: 1.5;
    h1{
        font-size: 90px;
        margin: 45px 0px 0px 90px;
        height: 95px;
        
    }
    p{
        font-size: 45px;
        font-weight: 800;
        margin: 0px 0px 90px 90px;
    }
    h2{
        font-size: 30px;
        margin: 0px 0px 100px 90px;
    }
    h3{
        font-size: 20px;
        font-weight: 200;
        margin: 0px 0px 0px 90px;
    }
`;

const Main = styled.div`
    flex: 1.5;
    display: flex;
    flex-flow: column;
    justify-content: center;
    h1{
        font-size: 300px;
        height: 350px;
        font-family: 'Gulim';
        text-align: center;
        margin: 0px;
    }
    p{
        font-size: 60px;
        color: darkgray;
        text-align: center;
        margin: 0px;
    }
`;

const News = styled.div`
    font-size: 25px;
    flex: 1.5;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
`;

const Temp = styled.span`
    font-size: 45px;
    padding: 5px 0;
    img{
        padding: 0 10px 0 0;
    }
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
    font-size: 15px;
`;
