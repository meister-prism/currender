import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import { Watch as WatchComponent } from '../../components/sample/Watch';


interface IStateToProps {
    Date: string,
    Time: string,
}

type IProps = IStateToProps;

interface IState {
    timerId: number
}

class Watch extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        const a = 1;
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

export default connect(
    mapStateToProps,
)(Watch);
