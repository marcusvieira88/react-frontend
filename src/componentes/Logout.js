import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import WebSocketService from "../websockets/WebSocketService";

export default class Logout extends Component {

    componentWillMount() {
        localStorage.removeItem('auth-token');
        new WebSocketService().destroy();
        browserHistory.push('/');
    }

    render() {
        return null;
    }
}