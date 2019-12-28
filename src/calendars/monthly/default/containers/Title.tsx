import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { Title as TitleComponent } from '../components/Title';


interface IStateToProps {
    Date: moment.Moment,
}

type IProps = IStateToProps;

class Title extends React.Component<IProps, {}> {
    componentDidMount() {
        const a = 1;
    }

    render() {
        const { Date } = this.props;
        return (
            <TitleComponent
                Month={Date.format('M')}
                MonthName={Date.format('MMMM')}
            />
        );
    }
}

const mapStateToProps = (state: RootState): IStateToProps => {
    const { CurrentState } = state;
    return {
        Date: CurrentState.nowDateTime,
    };
};


export default connect(
    mapStateToProps,
)(Title);
