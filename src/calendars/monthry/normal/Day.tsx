import * as React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    margin: auto
    height: 10px
    width: 95%
    background-color: #f4a460
`;

interface Props {
    item: string
}

export function Day(props: Props): JSX.Element {
    return (
        <Root>
            <p>テストテスト</p>
        </Root>
    );
}
