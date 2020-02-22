import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import styled from 'styled-components';
import { RootState } from './reducers';
import { webSocketActionCreator } from './actions/WebSocketAction';
import { TestHimekuri } from './calendars/himekuri/default/components/himekuri';
import { currentActionCreator } from './actions/CurrentAction';
import { IWIT } from './reducers/CurrentReducer';
import MonthlyCalendar from './calendars/monthly/default';

interface IStateToProps {
    connected: boolean;
    wit: IWIT;
    CurrenderTypeFlag: boolean;
}

interface IDispatchToProps {
    createConnection: (url: string) => void;
    updateDatetime: () => void;
}

type IProps = IStateToProps & IDispatchToProps;
type IState = { timerId: number, CurrenderTypeFlag: boolean }

class App extends React.Component<IProps, IState> {
    componentDidMount() {
        const { createConnection, updateDatetime } = this.props;
        updateDatetime();
        const timerId = setInterval(updateDatetime, 1000);
        const CurrenderTypeFlag = true;
        this.setState({ timerId, CurrenderTypeFlag });
        createConnection('ws://agile-river-42294.herokuapp.com');
    }

    componentWillUnmount() {
        const { timerId } = this.state;
        clearInterval(timerId);
        // this.setState({ CurrenderTypeFlag: !CurrenderTypeFlag });
    }

    changeFlag() {
        const { CurrenderTypeFlag } = this.state;
        this.setState({ CurrenderTypeFlag });
    }

    render() {
        const { connected, wit, CurrenderTypeFlag } = this.props;
        return (
            <Root>
                <input onClick={this.changeFlag} value="日めくり" name="" type="button" />
                {CurrenderTypeFlag && <MonthlyCalendar /> }
                {/* <TestHimekuri title="04" /> */}
            </Root>
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { WebSocketState, CurrentState } = state;
    return {
        connected: WebSocketState.connected,
        wit: CurrentState.whatIsToday,
        CurrenderTypeFlag: true,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    createConnection: (url: string) => dispatch(webSocketActionCreator.connect(url)),
    updateDatetime: () => dispatch(currentActionCreator.updateNowDate()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);


const Root = styled.div`
    height: 100%;
    width: 100%;
`;
