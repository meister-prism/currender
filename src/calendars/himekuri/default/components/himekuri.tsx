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
                <Side>
                    <h1>20/16°C</h1>
                    <h2>今日はCO₂の日です</h2>
                    <h3>[遅延情報]</h3>
                    <p>[News]</p>
                </Side>
            </Flex>
        </Root>
    );
}

const Root = styled.div`
    height: 1280px;
    width: 1080px;
    margin: 5px;
`;
const Flex = styled.div`
    display: flex;
`;

const Gallery = styled.div`
    h1{
        font-size: 50px;
        font-family: ;
    }
    p{
        font-size: 25px;
        font-weight: 800;
        font-family: ;
    }
    h2{
        font-size: 20px;
        font-family: ;
    }
    h3{
        font-size: 14px;
        font-weight: 200;
        font-family: ;
        font-family: ;
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

const Side = styled.div`
    h1{
        font-size: 25px;
        color: tomato;
    }
    h2{
        font-size: 18px;
        font-weight: 400;
    }
    h3{
        font-size: 15px;
        font-weight: 100;
    }
    p{
        font-size: 15px;
        font-weight: 100;
    }    
`;
