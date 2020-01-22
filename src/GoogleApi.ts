import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

export class GoogleApi {
    scope: Array<string>;

    oath2Client: OAuth2Client;

    constructor() {
        this.oath2Client = new google.auth.OAuth2({
            clientId: process.env.REACT_APP_CLIENT_ID,
            clientSecret: process.env.REACT_APP_CLIENT_SECRET,
            redirectUri: 'https://test.sun-yryr.com/redirect',
        });
        this.scope = ['https://www.googleapis.com/auth/calendar'];
    }

    AuthUrl(): string {
        const url = this.oath2Client.generateAuthUrl({
            access_type: 'online',
            scope: this.scope,
        });
        return url;
    }

    async fetchAccessToken(authorizationCode: string) {
        const { tokens } = await this.oath2Client.getToken(authorizationCode);
        this.oath2Client.setCredentials(tokens);
        this.oath2Client.on('tokens', (token) => {
            if (token.refresh_token) {
                this.oath2Client.setCredentials({
                    refresh_token: token.refresh_token,
                });
            }
        });
    }

    async calendarList() {
        const calendar = google.calendar({
            version: 'v3',
            auth: this.oath2Client,
        });
        const tmp = await calendar.calendarList.list();
        console.log(tmp);
    }
}
