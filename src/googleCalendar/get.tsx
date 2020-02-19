/* eslint-disable no-use-before-define */
import { CLIENT_ID, SCOPES, API_KEY, DISCOVERY_DOCS, CALENDAR_ID } from './common';

const ListeUpComingEvents = () => {
    console.log(window.gapi.client.calendar);
};

const updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
        ListeUpComingEvents();
    } else {
        window.gapi.auth2.getAuthInstance().signIn();
    }
};

const initClient = () => {
    window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
    }).then(() => {
        // listener
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
    }, (error) => {
        console.log(error);
    });
};

const init = () => {
    window.gapi.load('client:auth2', initClient);
};

const GetGoogleCalendar = () => {
    init();
};

export default GetGoogleCalendar;
