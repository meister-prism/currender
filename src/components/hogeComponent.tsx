import * as React from 'react';
import styled from 'styled-components';
import { HogeState } from '../reducers/hogeState';

interface OwnProps { }

type HogeProps = OwnProps & HogeState;

const FlexBox = styled.div`
    background-color: #99cc00
`;

export const HogeComponent: React.SFC<HogeProps> = (props: HogeProps) => {
    const { name } = props;
    return (
        <FlexBox>
            <div className="field">
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                />
            </div>
        </FlexBox>
    );
};
