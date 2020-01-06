import * as React from 'react';
import styled from 'styled-components';
import logo from '../../../../assets/sun.png';
import { IWeather, ITraffic, IAstrology } from '../../../../reducers/CurrentReducer';

interface Props {
    Month: string,
    MonthName: string,
    Weather: IWeather,
    Traffic: ITraffic,
    Astrology: IAstrology,
}

const Bar = styled.div`
    width: 100%
    height: 20px
    margin: 0 auto
    background-color: #000
`;

const Root = styled.div`
    width: 100%
    margin: 0 auto
    text-align: left
`;

const TitleBox = styled.span`
    width: 40%
    padding: 10px 20px
    float: left
`;

const TitleText = styled.h1`
    font-size: 100px
    margin: 0
`;

const NewsBox = styled.span`
    width: 100%
    border-radius: 3px
    border: 1px solid grey
    display: block
    margin: 0 0 1em
    padding: 0 5px
`;

const NewsText = styled.span`
    margin-left: 10px
`;

const Temp = styled.span`
    font-size: 30px
    padding: 5px 0
`;

const TempText = styled.span`
    font-size: 12px
    padding-left: 15px
`;

const HighTemp = styled.span`
    color: red
    padding: 0 0.5em
`;

const RowTemp = styled.span`
    color: blue
    padding: 0 0.5em
`;

const News = styled.span`
    width: 40%
    display: block
    margin: 2em 1em
    float: right
`;


export function Title(props: Props): JSX.Element {
    const {
        Month,
        MonthName,
        Weather,
        Traffic,
        Astrology,
    } = props;
    return (
        <Root>
            <Bar />
            <TitleBox>
                <TitleText>{Month}</TitleText>
                <h1>{MonthName}</h1>
            </TitleBox>
            <News>
                <img src={String(logo)} alt="weather" style={{ width: '70px' }} />
                <Temp>
                    <HighTemp>{Weather.temperature.max}</HighTemp>
                    /
                    <RowTemp>{Weather.temperature.min}</RowTemp>
                    ℃
                    <TempText>降水確率</TempText>
                    {Weather.rainfallProbability}
                    %
                </Temp>
                <p>今日はCO2の日です．息を吸いましょう．</p>
                <NewsBox>
                    <span>【遅延情報】</span>
                    <span>{Traffic.line}</span>
                    <br />
                    <NewsText>{Traffic.serviceStatus}</NewsText>
                    <NewsText>{Traffic.description}</NewsText>
                </NewsBox>
                <NewsBox>
                    <span>【占い】</span>
                    <span>{Astrology.constellation}</span>
                    <br />
                    <NewsText>{Astrology.message}</NewsText>
                </NewsBox>
            </News>
        </Root>
    );
}
