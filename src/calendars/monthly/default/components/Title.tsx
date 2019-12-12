import * as React from 'react';
import moment from 'moment';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { currentActionCreator } from '../../../../actions/CurrentAction';
import { Title as TitleComponent } from '../containers/Title';


interface IStateToProps {
    Date: string,
}

type IProps = IStateToProps;

interface IState {
    timerId: number
}

class Title extends React.Component<IProps, {}> {
    render() {
        const { Date } = this.props;
        const Moment: moment.Moment = moment(Date);
        return (
            <TitleComponent
                Month={Moment.format('M')}
                MonthName={Moment.format('MMMM')}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CurrentState } = state;
    return {
        Date: CurrentState.nowDate,
    };
};


export default connect(
    mapStateToProps,
)(Title);
