import * as React from 'react';
import styled from 'styled-components';
import moment from 'moment';
import logo from '../../../../assets/sun.png';
import {
    IWeather, ITraffic, IFortune, IWIT,
} from '../../../../reducers/CurrentReducer';
import { CalendarEvent, calendarColor } from '../../../../reducers/CalendarReducer';

interface Props {
    Date: string,
    Weather: IWeather,
    Traffic: ITraffic,
    Fortune: IFortune,
    WhatIsToday: IWIT,
    schedules: Array<CalendarEvent>,
    cColor: Array<calendarColor>,
}

function colorJudge(name: string, cColor: Array<calendarColor>) {
    const found = cColor.findIndex((element) => (element.name === name));
    return cColor[found].color;
}

// こっちは export する (without default)
// 返り値は JSX.Element だけど，推論が効くので書かなくて良い
export function Himekuri(props: Props) {
    const {
        Weather,
        Traffic,
        Fortune,
        Date,
        schedules,
        WhatIsToday,
        cColor,
    } = props;
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const weekday = moment(Date).format('d');
    const allDay = schedules.filter((s) => s.endSchedule.isSame(s.startSchedule));
    const NotAllDay = schedules.filter((s) => !s.endSchedule.isSame(s.startSchedule));
    return (
        <Root>
            <Bar />
            <FlexBox>
                <Gallery>
                    <h1>{moment(Date).format('M')}</h1>
                    <p>{moment(Date).format('MMMM')}</p>
                    {
                        (schedules.length === 0) ? (
                            <h2>
                                予定なし
                            </h2>
                        ) : null
                    }
                    {allDay.map((s: any) => (
                        <ListAllDay name={s.calendarName} cColor={cColor}>{s.title}</ListAllDay>
                    ))}
                    {NotAllDay.map((s: any) => (
                        <ListNotAllDay name={s.calendarName} cColor={cColor}>{s.title}</ListNotAllDay>
                    ))}

                </Gallery>
                <Main>
                    <h1>{moment(Date).format('D')}</h1>
                    <p>{days[Number(weekday)]}</p>
                </Main>
                <News>
                    <Temp>
                        <TempTitle>{Weather.title}</TempTitle>
                        <div>
                            <HighTemp>{Weather.temperature.max}</HighTemp>
                            <TempText>/</TempText>
                            <RowTemp>{Weather.temperature.min}</RowTemp>
                            <TempText>℃</TempText>
                        </div>

                        <div>
                            <TempText2>降水確率</TempText2>
                            <RainTemp>
                                {Weather.rainfallProbability}
                            </RainTemp>
                        </div>

                    </Temp>

                    <p>
                        {WhatIsToday.title}
                    </p>
                    {(Traffic !== undefined) ? (
                        <NewsBox>
                            <span>【遅延情報】</span>
                            <span>{Traffic.line}</span>
                            <br />
                            <NewsText>{Traffic.serviceStatus}</NewsText>
                            <NewsText>{Traffic.description}</NewsText>
                        </NewsBox>
                    ) : null}
                    <NewsBox>
                        <span>【占い】</span>
                        <span>{Fortune.constellation}</span>
                        <br />
                        <NewsText>{Fortune.message}</NewsText>
                    </NewsBox>
                </News>
            </FlexBox>
        </Root>
    );
}

const Root = styled.div`
    width: 100%;
    height: 65%;
    background-color: tomato;
`;

const Bar = styled.div`
    width: 100%;
    height: 15px;
    margin: 0 auto;
    background-color: black;
`;

const FlexBox = styled.div`
    display: flex;
    background-color: #eee;
    height: 100%;
`;

const Gallery = styled.div`
    flex: 1.5;
    h1{
        font-size: 90px;
        margin: 45px 0px 0px 90px;
        height: 95px;
        
    }
    p{
        font-size: 45px;
        font-weight: 800;
        margin: 0px 0px 90px 90px;
    }
    h2{
        font-size: 30px;
        margin: 0px 0px 100px 90px;
    }
    h3{
        font-size: 20px;
        font-weight: 200;
        margin: 0px 0px 0px 90px;
    }
`;

const Main = styled.div`
    flex: 1.5;
    display: flex;
    flex-flow: column;
    justify-content: center;
    h1{
        font-size: 300px;
        height: 350px;
        font-family: 'Gulim';
        text-align: center;
        margin: 0px;
    }
    p{
        font-size: 60px;
        color: darkgray;
        text-align: center;
        margin: 0px;
    }
`;

const NewsText = styled.span`
    margin-left: 10px
`;

const News = styled.div`
    font-size: 25px;
    flex: 1.5;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;
`;

const Temp = styled.span`
    font-size: 45px;
    padding: 5px 0;
    img{
        padding: 0 10px 0 0;
    }
`;

const TempTitle = styled.span`
    padding: 0 0.5px;
`;

const HighTemp = styled.span`
    color: tomato;
    padding: 0 0.5px;
`;

const RowTemp = styled.span`
    color: dodgerblue;
    padding: 0 0.5px;
`;

const RainTemp = styled.span`
    padding: 1em 0;
    padding-left: 15px;
`;

const TempText = styled.span`
    padding: 0 10px;
`;

const TempText2 = styled.span`
    padding: 0 10px 0 0;
`;

const NewsBox = styled.div`
    width: 95%;
    border: thin solid silver;
    border-radius: 3px;
    margin: 0 0 1em;
    padding: 0 5px;
    display: block;
    font-size: 18px;
`;

const ListAllDay = styled.li <{ name: string, cColor: Array<calendarColor> }>`
    line-height: 1.5;
    padding: 0.5em 0.5em 0.3em 0.5em;
    list-style-type: none!important;
    border-left: solid 6px ${({ name, cColor }) => `${colorJudge(name, cColor)}`};
`;

const ListNotAllDay = styled.li <{ name: string, cColor: Array<calendarColor> }>`
    line-height: 1.5;
    padding: 0.5em 0.5em 0.3em 0.5em;
    list-style-type: none!important;
    border-radius:5px
    background: ${({ name, cColor }) => `${colorJudge(name, cColor)}`};
`;
