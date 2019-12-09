import * as React from 'react';
import styled from 'styled-components';

const Root = styled.div`
    margin: auto
    height: 840px
    width: 95%
    background-color: #f4a460
`;

export function Day(): JSX.Element {
    return (
        <Root>
            <p>テストテスト</p>
        </Root>
    );
}
