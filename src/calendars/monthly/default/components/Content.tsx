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
                {calendar.map((value) => (
                    <Back>
                        <p>{value.date}</p>
                    </Back>
                ))}
            </Grid>
        </Root>
    );
}

const Root = styled.div`
    width: 100%;
    height: 50%;
`;

const Grid = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(7, 1fr);
    grid-auto-rows: 200px;
`;

const GridDay = styled(Grid)`
    grid-auto-rows: 75px;
    border-bottom: 3px solid gray;
`;


const Back = styled.div`
    background-color: #7fff00;
    margin: 2px;
`;

const DayText = styled.p`
    font-weight: bold;
    font-size: xx-large;
    text-align: center;
`;
