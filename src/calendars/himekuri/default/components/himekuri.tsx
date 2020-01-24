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
            <Flex>
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
                        <RowTemp>15</RowTemp>
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
            </Flex>
        </Root>
    );
}

const Root = styled.div`
    height: 1280px;
    width: 1080px;
    margin: 0 aout;
    text-aling: left;
`;
const Flex = styled.div`
    display: flex;
    width: 100%;
    heigth: 100%;
`;

const Gallery = styled.div`
    h1{
        font-size: 50px;
    }
    p{
        font-size: 25px;
        font-weight: 800;
    }
    h2{
        font-size: 20px;
    }
    h3{
        font-size: 14px;
        font-weight: 200;
    }
`;

const Main = styled.div`
    h1{
        font-size: 200px;
        font-family: 'Gulim',;
    }
    p{
        font-size: 30px;
        color: darkgray;
    }
`;

const News = styled.span`
    
`;

const Temp = styled.samp`
    font-size: 30px;
`;

const HighTemp = styled.samp`
    color: tomato;
`;

const RowTemp = styled.samp`
    color: dodgerblue;
`;

const NewsBox = styled.samp`
    border: thin solid silver;
    border-radius: 3px;
    margin: 0 0 1em;
    padding: 0 5px;
    display: block;
`;
