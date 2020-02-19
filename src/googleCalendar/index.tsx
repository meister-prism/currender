/* eslint-disable max-classes-per-file */
import React from 'react';
import {
    CLIENT_ID,
    SCOPES,
    API_KEY,
    DISCOVERY_DOCS,
} from './common';
import { ReactComponent } from '*.svg';

export { default as GetGoogleCalendar } from './get';

export class GoogleAPIInit {
    constructor() {
        window.gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        });
    }
}

type IState = { isPushed : boolean }

export class LoginButton extends React.Component<{}, IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isPushed: false,
        };
    }
    
    Login() {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    render() {
        return (
            <>
                <button type="button" onClick={this.Login}>login</button>
            </>
        );
    }
}
