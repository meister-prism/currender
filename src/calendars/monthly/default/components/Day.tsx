import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { CalendarEvent } from '../../../../reducers/CalendarReducer';

interface Props {
    date: string,
    schedules: Array<CalendarEvent>,
}

interface IStateToProps {
    Date: string,
}

export function Day(props: Props): JSX.Element {
    const { date } = props;
    const weekday = moment(date).format('d');
    const day = moment(date).format('D');
    let A;
    const { schedules } = props;
    if (weekday === '0') {
        A = (
            <Sunday>
                <div>
                    <P1>{day}</P1>
                    <ul>予定</ul>
                    {schedules.map((schedule) => (
                        <li>{schedule.title}</li>
                    ))}
                </div>
            </Sunday>
        );
    } else if (weekday === '6') {
        A = (
            <Saturday>
                <div>
                    <P1>{day}</P1>
                    <ul>予定</ul>
                    {schedules.map((schedule) => (
                        <li>{schedule.startSchedule}</li>
                    ))}
                </div>
            </Saturday>
        );
    } else {
        A = (
            <Root>
                <div>
                    <P1>{day}</P1>
                    <ul>予定</ul>
                    {schedules.map((schedule) => (
                        <li>{schedule.title}</li>
                    ))}
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
    background-color: #fff
`;
const P1 = styled.p`
    font-size: 2.5rem;
    padding: 10px;
    text-align: right;
`;
const Sunday = styled(Root)`
    color: red;
`;
const Saturday = styled(Root)`
    color: blue;
`;
