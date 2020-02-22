/* eslint-disable no-use-before-define */
/* eslint-disable react/no-array-index-key */
import * as React from 'react';
import styled, { css } from 'styled-components';
import Modal from 'react-modal';
import moment from 'moment';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';
import { Day as DayComponent } from './Day';

Modal.setAppElement('#root');

interface sortCalendar extends CalendarEvent {
    index: number,
}

interface tmpCal {
    date: string,
    schedules: Array<sortCalendar>,
}

interface Props {
    calendar: Array<tmpCal>,
    isOpen: boolean,
    toggleModal: any,
    modalIndex: number,
    cColor: Array<calendarColor>,
}

function colorJudge(name: string, cColor: Array<calendarColor>) {
    const found = cColor.findIndex((element) => (element.name === name));
    return cColor[found].color;
}

export function Content(props: Props): JSX.Element {
    const {
        calendar,
        isOpen,
        toggleModal,
        modalIndex,
        cColor,
    } = props;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const rows = calendar.length > 35 ? 6 : 5;
    return (
        <Root>
            <Modal
                id="Date"
                contentLabel="Day"
                closeTimeoutMS={150}
                isOpen={isOpen}
                onRequestClose={() => toggleModal(0)}
                style={ModalStyle}
            >
                <h1>
                    {String(moment(calendar[modalIndex].date).format('M/D'))}
                    の予定
                </h1>
                {ModalComponent(calendar[modalIndex].date, calendar[modalIndex].schedules, cColor)}
            </Modal>
            <Grid rows={rows}>
                {days.map((value, index) => (
                    <DayText key={index}>{value}</DayText>
                ))}
                {calendar.map((value, index) => {
                    // 左右のときに横罫線が消えているデザインだったので
                    let p = (index % 7 === 0) ? 'left' : undefined;
                    p = (index % 7 === 6) ? 'right' : p;
                    return (
                        <GridItem
                            key={index}
                            position={p}
                            onClick={() => toggleModal(index)}
                        >
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
    height: 75%;
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

/* これがモーダル自体のスタイル．多分中央寄せ・大きさは子要素に合わせるになってる */
const ModalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

/* これがモーダルの中身のJSX */
const ModalComponent = (day: string, events: Array<CalendarEvent>, cColor: Array<calendarColor>): JSX.Element => (
    <table>
        {events.map((event) => (
            <div>
                <Title event={event} Color={cColor}>{event.title}</Title>
                <Name>{event.calendarName}</Name>
            </div>
        ))}
    </table>
);
/* モーダルのcssはここから下でお願いします */

const Title = styled.li<{ event: CalendarEvent, Color: Array<calendarColor> }>`
    list-style-type: none!important;
    font-size: 1.5em;
    padding: 0.3em;
    line-height; 1.5;
    vertical-align:middle
    ${({ event, Color }) => (event.endSchedule.isSame(event.startSchedule) ? css`
        border-left: solid 6px ${colorJudge(event.calendarName, Color)};
        &:after {
            content: ' 終日';
            font-size: 1em;
            padding: 0.3em;
        }
    ` : css`
        border-left: solid 6px ${colorJudge(event.calendarName, Color)};
    `)}
`;

const Name = styled.div`
    list-style-type: none!important;
    padding: 0 0 0.5em 1em;
`;
