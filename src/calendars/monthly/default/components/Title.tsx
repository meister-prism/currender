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

interface IDispatchToProps {
    updateDatetime: () => void;
}

type IProps = IStateToProps & IDispatchToProps;

interface IState {
    timerId: number
}

class Title extends React.Component<IProps, IState> {
    componentDidMount() {
        const { updateDatetime } = this.props;
        const timerId = setInterval(updateDatetime, 1000);
        this.setState({ timerId });
    }

    componentWillUnmount() {
        const { timerId } = this.state;
        clearInterval(timerId);
    }

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

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    updateDatetime: () => dispatch(currentActionCreator.updateNowDate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Title);
