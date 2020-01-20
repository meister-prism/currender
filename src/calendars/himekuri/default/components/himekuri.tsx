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
        <Flexbox>
          <Gallery>
               <h1>04</h1>
               <p>April</p>
               <h2>レポート締め切り</h2>
               <h3>14:00-15:00 </h3>
          </Gallery>
          <Main>
               <h1>{`${title}`}</h1>
               <p>{`${title}`}</p>
          </Main>    
          <Side>   
              <>
          </Side>             
        </Flexbox>
    );
}

const Flexbox = styled.div`
   display:flex;
