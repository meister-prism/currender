import React from 'react';
import axios from 'axios';
import { RouteComponentProps } from 'react-router-dom';
import queryString from 'query-string';

interface IState {
    isLogin: boolean,
    API_KEY?: string,
    CLIENT_ID: string,
    DISCOVERY_DOCS: Array<string>,
    SCOPES: string,
    REDIRECT_URL: string;
    CODE?: string,
}

export class GoogleApi extends React.Component<RouteComponentProps, IState> {
    constructor(props: any) {
        super(props);
        const { location: { search } } = this.props;
        const query = queryString.parse(search);
        const CODE = query.code as (string | undefined);
        this.state = {
            isLogin: (CODE !== undefined),
            API_KEY: process.env.REACT_APP_GOOGLE_API_KEY,
            CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            REDIRECT_URL: 'https://test2.sun-yryr.com/redirect',
            SCOPES: 'profile',
            CODE,
        };
    }

    getAuthUrl(): string {
        const { CLIENT_ID, REDIRECT_URL, SCOPES } = this.state;
        let url = 'https://accounts.google.com/o/oauth2/auth?response_type=code';
        url += `&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&access_type=offline&approval_prompt=force`;
        return url;
    }

    // codeからtokenを取得する。バックグラウンド処理。保存したトークンはredux or this.state
    async authorization() {
        const { CODE, CLIENT_ID } = this.state;
        axios.post('https://www.googleapis.com/oauth2/v4/token', {
            code: CODE,
            client_id: CLIENT_ID,
        });
    }

    // code取得前はlinkを表示している
    render() {
        const url = this.getAuthUrl();
        const { isLogin } = this.state;
        if (isLogin) { return null; }
        return <a href={url}>login</a>;
    }
}
