import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { IWeather, ITraffic, IFortune } from '../../../../reducers/CurrentReducer';
import { Title as TitleComponent } from '../components/Title';


interface IStateToProps {
    Date: string,
    Weather: IWeather,
    Traffic: Array<ITraffic>,
    Fortunes: Array<IFortune>,
}

type IProps = IStateToProps;

class Title extends React.Component<IProps, {}> {
    componentDidMount() {
        const a = 1;
    }

    render() {
        const {
            Date,
            Weather,
            Traffic,
            Fortunes,
        } = this.props;
        const Moment: moment.Moment = moment(Date);
        return (
            <TitleComponent
                Month={Moment.format('M')}
                MonthName={Moment.format('MMMM')}
                Weather={Weather}
                Traffic={Traffic[0]}
                Fortune={Fortunes[0]}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const {
        CurrentState:
        {
            nowDateTime,
            weather,
            traffic,
            fortune,
        },
    } = state;
    return {
        Date: nowDateTime.format('YYYY-MM-DD'),
        Weather: weather,
        Traffic: traffic,
        Fortunes: fortune,
    };
};


export default connect(
    mapStateToProps,
)(Title);
