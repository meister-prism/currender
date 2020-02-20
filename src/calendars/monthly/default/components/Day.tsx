import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { CalendarEvent } from '../../../../reducers/CalendarReducer';

interface Props {
    date: string,
    schedules: Array<CalendarEvent>,
}

export function Day(props: Props): JSX.Element {
    const { date, schedules } = props;
    const weekday = moment(date).format('d');
    const day = moment(date).format('D');
    let A;
    if (schedules !== undefined) {
        console.log(schedules);
        A = (
            <Root>
                <div>
                    <P1 weekday={Number(weekday)}>{day}</P1>
                    <ul>予定</ul>
                    {schedules.map((s, index) => (
                        <li key={index}>{s.title}</li>
                    ))}
                </div>
            </Root>
        );
    }
    else {
        A = (
            <Root>
                <div>
                    <P1 weekday={Number(weekday)}>{day}</P1>
                </div>
            </Root>
        );
    }
    return (
        <div>
            {A}
        </div>
    );
}

const Root = styled.div`
    margin: auto
    height: 300px
    width: 150px
`;
const P1 = styled.p<{ weekday: number }>`
    font-size: 2.5rem;
    padding: 10px;
    text-align: right;
    color: ${({ weekday }) => weekday === 0 ? 'red' : 'black' && weekday === 6 ? 'blue' : 'black'}}
`;