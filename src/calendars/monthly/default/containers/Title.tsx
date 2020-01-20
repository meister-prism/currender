import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { RootState } from '../../../../reducers';
import { Title as TitleComponent } from '../components/Title';


interface IStateToProps {
    Date: string,
}

type IProps = IStateToProps;

class Title extends React.Component<IProps, {}> {
    componentDidMount() {
        const a = 1;
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


export default connect(
    mapStateToProps,
)(Title);
