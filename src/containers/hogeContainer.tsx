import { Action } from 'typescript-fsa';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { hogeActions } from '../actions/hogeActions';
import { HogeComponent } from '../components/hogeComponent';

export interface HogeActions {
    update: (v: string) => Action<string>;
}

function mapDispatchToProps(dispatch: Dispatch<Action<string>>) {
    return {
        update: (v: string) => dispatch(hogeActions.update(v)),
    };
}

function mapStateToProps(appState: AppState) {
    return { ...appState.hoge };
}

export default connect(mapStateToProps, mapDispatchToProps)(HogeComponent);
