import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import styled from 'styled-components';
import { RootState } from './reducers';
import { webSocketActionCreator } from './actions/WebSocketAction';
import Himekuri from './calendars/himekuri/default/containers/Himekuri';
import { currentActionCreator } from './actions/CurrentAction';
import { IWIT } from './reducers/CurrentReducer';
import MonthlyCalendar from './calendars/monthly/default';
import Memo from './containers/Memo';

interface IStateToProps {
    connected: boolean;
    wit: IWIT;
}

interface IDispatchToProps {
    createConnection: (url: string) => void;
    updateDatetime: () => void;
}

type IProps = IStateToProps & IDispatchToProps;
type IState = { timerId: number, CurrenderTypeFlag: boolean }

class App extends React.Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            CurrenderTypeFlag: true,
            timerId: 0,
        };
        this.changeFlag = this.changeFlag.bind(this);
    }

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
        this.setState({ CurrenderTypeFlag: !CurrenderTypeFlag });
    }

    render() {
        const { CurrenderTypeFlag } = this.state;
        return (
            <Root>
                <ChangeBar>
                    {/* <input onClick={this.changeFlag} src={save} name="" type="button" /> */}
                    <ChangeButton onClick={this.changeFlag} value="切り替え" name="" type="button" />
                </ChangeBar>
                {CurrenderTypeFlag && <MonthlyCalendar /> }
                {!CurrenderTypeFlag && <Himekuri /> }
                <Memo />
            </Root>
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { WebSocketState, CurrentState } = state;
    return {
        connected: WebSocketState.connected,
        wit: CurrentState.whatIsToday,
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

const ChangeBar = styled.div`
    width: 100%
    padding: 10px
    text-align: right
`;

const ChangeButton = styled.input`
    display: inline-block 
    margin-right: 20px
`;
