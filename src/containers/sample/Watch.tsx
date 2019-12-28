import * as React from 'react';
import { Dispatch, Action } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { currentActionCreator } from '../../actions/CurrentAction';
import { Watch as WatchComponent } from '../../components/sample/Watch';


interface IStateToProps {
    Date: string,
    Time: string,
}

interface IDispatchToProps {
    updateDatetime: () => void;
}

type IProps = IStateToProps & IDispatchToProps;

interface IState {
    timerId: number
}

class Watch extends React.Component<IProps, IState> {
    componentDidMount() {
        const { updateDatetime } = this.props;
        updateDatetime();
        const timerId = setInterval(updateDatetime, 1000);
        this.setState({ timerId });
    }

    componentWillUnmount() {
        const { timerId } = this.state;
        clearInterval(timerId);
    }

    render() {
        const { Date, Time } = this.props;
        return (
            <WatchComponent
                Date={Date}
                Time={Time}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CurrentState: { nowDateTime } } = state;
    return {
        Date: nowDateTime.format('YYYY-MM-DD'),
        Time: nowDateTime.format('hh:mm:ss'),
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    updateDatetime: () => dispatch(currentActionCreator.updateNowDate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Watch);
