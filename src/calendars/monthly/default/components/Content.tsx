/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';
import { Day as DayComponent } from './Day';

interface tmpCal {
    date: string,
    schedules: Array<CalendarEvent>,
}

interface Props {
    calendar: Array<tmpCal>,
    cColor: Array<calendarColor>,
}

export function Content(props: Props): JSX.Element {
    const { calendar, cColor } = props;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const rows = calendar.length > 35 ? 6 : 5;
    return (
        <Root>
            <Grid rows={rows}>
                {days.map((value, index) => (
                    <DayText key={index}>{value}</DayText>
                ))}
                {calendar.map((value, index) => {
                    // 左右のときに横罫線が消えているデザインだったので
                    let p = (index % 7 === 0) ? 'left' : undefined;
                    p = (index % 7 === 6) ? 'right' : p;
                    return (
                        <GridItem key={index} position={p}>
                            <DayComponent
                                date={value.date}
                                schedules={value.schedules}
                                cColor={cColor}
                            />
                        </GridItem>
                    );
                })}
            </Grid>
        </Root>
    );
}

const Root = styled.div`
    width: 97%;
    height: 83%;
    margin: auto;
`;

const Grid = styled.div<{ rows: number }>`
    display: grid;
    width: 100%;
    height: calc(100% - 40px);
    grid-template-columns: repeat(7, 1fr);
    grid-template-rows: ${({ rows }) => `40px repeat(${rows}, 1fr)`};
    border-bottom: 1px solid gray;
`;

const GridItem = styled.div<{ position?: string }>`
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
    margin: 0px;
`;
