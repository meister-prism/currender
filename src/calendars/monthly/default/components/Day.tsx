/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { CalendarEvent } from '../../../../reducers/CalendarReducer';

interface Props {
    date: string,
    schedules: Array<CalendarEvent>,
}
function getAllDay(start: string, end: string) {
    if (start === end) {
        return 'allDay';
    }
    return start;
}
export function Day(props: Props): JSX.Element {
    const { date, schedules } = props;
    const weekday = moment(date).format('d');
    const day = moment(date).format('D');
    const A = (
        <Root>
            <div>
                <P1 weekday={Number(weekday)}>{day}</P1>
                {schedules.map((s, index) => (
                    <List key={index} checkDay={getAllDay(String(s.startSchedule), String(s.endSchedule))} date={String(date)}>{s.title}</List>
                ))}
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
const List = styled.li<{ checkDay: string, date: string }>`
    margin-bottom: 3px;
    line-height: 1.5;
    padding: 0.5em;
    list-style-type: none!important;
    margin:  ${({ checkDay, date }) => {
        let margin = (checkDay === 'allDay') ? '0 0 3px 10px;' : '0 0 3px 0';
        margin = (checkDay === date) ? ' 0 0 3px 5px;' : margin;
        return margin;
    }}}
    color: #2d8fdd;
    background: #f1f8ff;
    border-left: ${({ checkDay }) => {
        const allDay = (checkDay === 'allDay') ? 'solid 6px #2d8fdd;' : 'none';
        return allDay;
    }}}
`;
