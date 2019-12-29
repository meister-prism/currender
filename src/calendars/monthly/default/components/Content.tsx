import * as React from 'react';
import styled from 'styled-components';
import { CalendarEvent } from '../../../../reducers/CalendarReducer';

interface tmpCal {
    date: string,
    schedules: Array<CalendarEvent>,
}

interface Props {
    calendar: Array<tmpCal>,
}

export function Content(props: Props): JSX.Element {
    const { calendar } = props;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    return (
        <Root>
            <GridDay>
                {days.map((value) => <DayText>{value}</DayText>)}
            </GridDay>
            <Grid>
                {calendar.map((value, index) => {
                    // 左右のときに横罫線が消えているデザインだったので
                    let p = (index % 7 === 0) ? 'left' : undefined;
                    p = (index % 7 === 6) ? 'right' : p;
                    return (
                        <GridItem position={p}>
                            <p>{value.date}</p>
                        </GridItem>
                    );
                })}
            </Grid>
        </Root>
    );
}

const Root = styled.div`
    width: 97%;
    // height: 50%;
    margin: auto;
`;

const Grid = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 200px;
    border-bottom: 1px solid gray;
`;

const GridDay = styled(Grid)`
    grid-auto-rows: 75px;
    border-bottom: 1px solid gray;
`;


const GridItem = styled.div<{position?: string }>`
    border-style: solid;
    border-color: #a9a9a9 #d3d3d3;
    border-width: 1px;
    // padding: 1px;

    border-left-style: ${({ position }) => (position === 'left' ? 'none' : 'solid')}
    border-right-style: ${({ position }) => (position === 'right' ? 'none' : 'solid')}
`;

const DayText = styled.p`
    font-weight: bold;
    font-size: xx-large;
    text-align: center;
`;
