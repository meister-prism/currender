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
    const { schedules } = props;
    return (
        <Root>
            <div>
                <P1 weekday={Number(weekday)}>{day}</P1>
                <ul>予定</ul>
                <div>{schedules}</div>
            </div>
        </Root>
    );
}

const Root = styled.div`
    margin: auto
    height: 300px
    width: 150px
    background-color: #fff
`;
const P1 = styled.p<{ weekday: number }>`
    font-size: 2.5rem;
    padding: 10px;
    text-align: right;
    // weekday が 0(日曜) か 6(土曜) なら各種色をつける
    color: ${({ weekday }) => {
        let tmpColor = (weekday === 0) ? 'red' : 'black';
        tmpColor = (weekday === 6) ? 'blue' : tmpColor;
        return tmpColor;
    }}}
`;
const Sunday = styled(Root)`
    color: red;
`;
const Saturday = styled(Root)`
    color: blue;
`;
