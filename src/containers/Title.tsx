import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../reducers';
import { currentActionCreator } from '../actions/CurrentAction';
import { Title as TitleComponent } from '../components/Title';


interface IStateToProps {
    Date: string,
    Time: string,
    Month: string,
    MonthName: string,
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
        const { Date, Time, Month, MonthName } = this.props;
        return (
            <TitleComponent
                Date={Date}
                Time={Time}
                Month={Month}
                MonthName={MonthName}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CurrentState } = state;
    return {
        Date: CurrentState.nowDate,
        Time: CurrentState.nowTime,
        Month: CurrentState.nowMonth,
        MonthName: CurrentState.nowMonthName,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    updateDatetime: () => dispatch(currentActionCreator.updateNowDate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Title);
