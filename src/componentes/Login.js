import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import UserEnum from '../enums/UserEnum';
import LoginApi from '../backend-api/LoginApi';
import WebSocketService from '../websockets/WebSocketService'
import {cardStyle, fieldStyle, buttonStyle} from '../css/Login';

import {Card, SelectField, TextField, RaisedButton, MenuItem} from 'material-ui';
import UserApi from "../backend-api/UserApi";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.type = '';
        this.state.userId = '';
        this.state.password = '';
    }

    async componentWillMount() {
        localStorage.removeItem('auth-token');
        new WebSocketService().destroy();
    }

    async register(ev) {
        ev.preventDefault();
        browserHistory.push('/register');
    }

    async login(ev) {
        ev.preventDefault();

        const requestData = {
            type: this.state.type,
            userId: this.state.userId,
            password: this.state.password
        };

        const result = await LoginApi.authenticate(requestData);
        let data = result.data.userData;
        data.type = this.state.type;
        localStorage.setItem('auth-token', result.data.token);
        localStorage.setItem('user-logged', JSON.stringify(data));

        //Initialize Socket
        const webSocket = WebSocketService.getInstance();
        webSocket.initialize(result.data.token, this.props.routes[0].NotificationManager);
        webSocket.requestStoredNotifications(data.id);
        browserHistory.push('/home');
    }


    render() {
        return (
            <div style={{width: 'auto', marginLeft: '50%', transform: 'translateX(-50%)'}}>
                <Card style={cardStyle}>
                    <form>
                        <SelectField style={fieldStyle}
                                     floatingLabelText="User Type*"
                                     value={this.state.type}
                                     onChange={function (event, key, value) {
                                         this.setState({type: value});
                                     }.bind(this)}
                        >
                            <MenuItem value={UserEnum.getTypesEnum().CLIENT}
                                      primaryText={'Client'}/>
                            <MenuItem value={UserEnum.getTypesEnum().USER} primaryText={'Expert'}/>
                        </SelectField>
                        {this.state.type === UserEnum.getTypesEnum().CLIENT ?
                            <TextField
                                id="email"
                                label="Email"
                                style={fieldStyle}
                                value={this.state.userId}
                                floatingLabelText={'Email*'}
                                onChange={function (event, value) {
                                    this.setState({userId: value});
                                }.bind(this)}
                            /> : null}

                        {this.state.type !== UserEnum.getTypesEnum().CLIENT ?
                            <TextField
                                id="memberNo"
                                label="MemberNo"
                                style={fieldStyle}
                                value={this.state.userId}
                                floatingLabelText={'MemberNo*'}
                                onChange={function (event, value) {
                                    this.setState({userId: value});
                                }.bind(this)}
                            /> : null}

                        <TextField
                            id="password"
                            type={"password"}
                            label="password"
                            style={fieldStyle}
                            value={this.state.password}
                            floatingLabelText={'Password*'}
                            onChange={function (event, value) {
                                this.setState({password: value});
                            }.bind(this)}
                        />
                        <RaisedButton type="button" label="Login"
                                      style={buttonStyle} primary={true}
                                      onClick={this.login.bind(this)}
                                      disabled={!this.state.type || !this.state.userId || !this.state.password}
                        />

                        <RaisedButton type="button" label="Register" style={buttonStyle} primary={true}
                                      onClick={this.register.bind(this)}/>
                    </form>
                </Card>
            </div>
        );
    }
}