/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import styled, { css } from 'styled-components';
import moment from 'moment';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';

interface sortCalendar extends CalendarEvent {
    index: number,
}

interface Props {
    date: string,
    schedules: Array<sortCalendar>,
    cColor: Array<calendarColor>,
}

function getAllDay(start: string, end: string) {
    if (start === end) {
        return 'allDay';
    }
    return moment(start).format('YYYY-MM-DD');
}
function colorJudge(name: string, cColor: Array<calendarColor>) {
    const found = cColor.findIndex((element) => (element.name === name));
    return cColor[found].color;
}

export function Day(props: Props): JSX.Element {
    const { date, schedules, cColor } = props;
    const weekday = moment(date).format('d');
    const day = moment(date).format('D');
    const divisionAll: any = schedules.filter((s) => (getAllDay(String(s.startSchedule), String(s.endSchedule)) !== 'allDay'));
    const divisionNotAll: any = schedules.filter((s) => (getAllDay(String(s.startSchedule), String(s.endSchedule)) === 'allDay'));
    const A = (
        <Root>
            <div>
                <P1 weekday={Number(weekday)}>{day}</P1>
                <Grid rows={5}>
                    {divisionAll.map((s: any) => (
                        <List checkDay={getAllDay(String(s.startSchedule), String(s.endSchedule))} date={String(date)} name={s.calendarName} cColor={cColor} cols={s.index}>{s.title}</List>
                    ))}
                    {divisionNotAll.map((s: any) => (
                        <List checkDay={getAllDay(String(s.startSchedule), String(s.endSchedule))} date={String(date)} name={s.calendarName} cColor={cColor} cols={s.index}>{s.title}</List>
                    ))}
                </Grid>
            </div>
        </Root>
    );
    return (
        <div>
            {A}
        </div>
    );
}

const Root = styled.div`
    margin: auto;
    height: 300px;
    width: 150px;
    &:hover {
        background-color: #c2c2c2;
        cursor: pointer;
    }
`;
const P1 = styled.p<{ weekday: number }>`
    font-size: 2.5rem;
    padding: 10px;
    margin: 0;
    text-align: right;
    color: ${({ weekday }) => {
        let tmpColor = (weekday === 0) ? 'red' : 'black';
        tmpColor = (weekday === 6) ? 'blue' : tmpColor;
        return tmpColor;
    }}}
`;
const List = styled.div<{ checkDay: string, date: string, name: string, cColor: Array<calendarColor>, cols: number }>`
    line-height: 1.5;
    padding: 0.5em 0.5em 0.3em 0.5em;
    list-style-type: none!important;
    ${({ checkDay, name, cColor }) => (checkDay === 'allDay' ? css`
        border-left: solid 6px ${colorJudge(name, cColor)};
    ` : css`
        background: ${colorJudge(name, cColor)};
    `)}
    ${({ checkDay, date }) => (checkDay === date || checkDay === 'allDay' ? css`
        margin: 0 0 3px 10px;
        border-radius:5px 0 0 5px;
    ` : css`
        margin: 0 0 3px 0;
        text-indent: 120%;
        white-space:nowrap;
        overflow:hidden;
        border-radius:0 5px 5px 0;
    `)} 
    color: #4f5254;
    grid-row-start: ${({ cols }) => `${cols + 1}`};
    grid-row-end: ${({ cols }) => `${cols + 2}`};
`;

const Grid = styled.div<{ rows: number }>`
    display: grid;
    grid-auto-flow: column;
    width: 100%;
    grid-template-column: ${({ rows }) => `repeat(${rows}, 1fr)`};
`;
