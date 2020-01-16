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
          <div classname="gallery">
               <h1>{`${title}`}</h1>
               <p>{`${title}`}</p>
               <h2>{`${title}`}</h2>
               <h3>{`${title}`}</h3>
          </div>
          <div classname="main">
               <h1>{`${title}`}<h1>
               <p>{`${title}`}<p>
          </div>                
        </Flexbox>
    );
}

const Flexbox = styled.div`
   display:flex;
