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
        <A>
            <p>{`Hello ${title}`}</p>
        </A>
    );
}

const A = styled.div`
    background-color: #f3f3f3;
    width: 1080px;
    height: 1920p;
`;
