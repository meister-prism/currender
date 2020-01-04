import * as React from 'react';
import styled from 'styled-components';

/* テスト用range */
const range = (begin: number, end: number) => Array.from({ length: (end - begin + 1) }, (v, k) => k + begin);

export function Monthly() {
    return (
        <Root>
            <Flex>
                {range(0, 9).map(() => (
                    <FlexItem theme={{ width: '12.28%', margin: '1%' }}>
                        <TestDayComponent />
                    </FlexItem>
                ))}
            </Flex>
        </Root>
    );
}

const Root = styled.div`
    margin: 5px;
    height: 1280px;
    width: 1080px;
`;

const Flex = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const FlexItem = styled.div`
    width: ${({ theme }) => theme.width};
    margin: ${({ theme }) => theme.margin};
`;

/* テスト用 */
function TestDayComponent() {
    const TRoot = styled.div`
        height: 200px;
        width: 150px;
        background-color: #FFFF99;

        position: relative;
    `;
    const Text = styled.p`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0px;
    `;
    return (
        <TRoot>
            <Text>テスト</Text>
        </TRoot>
    );
}
