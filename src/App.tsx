import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, Action } from 'redux';
import { RootState } from './reducers';
import { webSocketActionCreator } from './actions/WebSocketAction';
import Watch from './containers/sample/Watch';
import Title from './calendars/monthly/default/containers/Title';
import Content from './calendars/monthly/default/containers/Content';

interface IStateToProps {
    connected: boolean;
}

interface IDispatchToProps {
    createConnection: (url: string) => void;
}

type IProps = IStateToProps & IDispatchToProps;

class App extends React.Component<IProps, {}> {
    componentDidMount() {
        const { createConnection } = this.props;
        createConnection('ws://localhost:8080');
    }

    render() {
        const { connected } = this.props;
        return (
            <div>
                <p>{`WebSocket connected ? -> ${connected.toString()}`}</p>
                <Watch />
                <Content />
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { WebSocketState } = state;
    return { connected: WebSocketState.connected };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
    createConnection: (url: string) => dispatch(webSocketActionCreator.connect(url)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);
