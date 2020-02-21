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
    TOKEN: any,
}

export default class GoogleApi extends React.Component<RouteComponentProps, IState> {
    constructor(props: any) {
        super(props);
        const { location: { search } } = this.props;
        const query = queryString.parse(search);
        const CODE = query.code as (string | undefined);
        const TOKEN = 'hoghogee';
        this.state = {
            isLogin: (CODE !== undefined),
            API_KEY: process.env.REACT_APP_GOOGLE_API_KEY || '',
            CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID || '',
            DISCOVERY_DOCS: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
            REDIRECT_URL: 'http://localhost:3000',
            SCOPES: 'profile',
            CODE,
            TOKEN,
        };
    }

    getAuthUrl(): string {
        const { CLIENT_ID, REDIRECT_URL, SCOPES } = this.state;
        let url = 'https://accounts.google.com/o/oauth2/auth?response_type=code';
        url += `&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${SCOPES}&access_type=offline&approval_prompt=force`;
        return url;
    }

    // codeからtokenを取得する。バックグラウンド処理。保存したトークンはredux or this.state
    authorization() {
        const { CLIENT_ID, REDIRECT_URL, SCOPES } = this.state;
        const url = 'https://accounts.google.com/o/oauth2/v2/auth';
        const config = {
            headers: { 'Access-Control-Allow-Origin': '*' },
        };
        axios.post(url, {
            client_id: CLIENT_ID,
            redirect_uri: REDIRECT_URL,
            response_type: 'code',
            scope: SCOPES,
        }, config).then((res) => {
            this.setState({ TOKEN: res.data });
        }).catch((err) => {
            this.setState({ TOKEN: err });
        });
    }

    // code取得前はlinkを表示している
    render() {
        const url = this.getAuthUrl();
        const { isLogin } = this.state;
        if (isLogin) {
            this.authorization();
            return null;
        }
        return <a href={url}>login</a>;
    }
}
