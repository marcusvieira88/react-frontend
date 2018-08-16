import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import UserEnum from "../enums/UserEnum";
import ZodiacEnum from "../enums/ZodiacEnum";
import GenderEnum from "../enums/GenderEnum";
import RegisterApi from "../backend-api/RegisterApi";
import {cardStyleClient, cardStyleUser, fieldStyle, buttonStyle} from '../css/Register';

import {Card, SelectField, TextField, RaisedButton, MenuItem} from 'material-ui';

export default class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.state.msg = this.props.location.query.msg;
        this.state.type = UserEnum.getTypesEnum().CLIENT;
        this.state.clientData = {
            firstName: '',
            lastName: '',
            password: '',
            zodiac: '',
            birthdate: '',
            email: '',
            gender: '',
        };

        this.state.userData = {
            memberNo: '',
            name: '',
            password: '',
            email: '',
        };

        this.onChangeType = this.onChangeType.bind(this);
        this.onChangeClientFirstName = this.onChangeClientFirstName.bind(this);
        this.onChangeClientLastName = this.onChangeClientLastName.bind(this);
        this.onChangeClientPassword = this.onChangeClientPassword.bind(this);
        this.onChangeClientProperty = this.onChangeClientProperty.bind(this);
    }

    onChangeType(ev) {
        let typeValue = ev.target.value;

        if (typeValue === UserEnum.getTypesEnum().CLIENT) {
            typeValue = UserEnum.getTypesEnum().CLIENT;
        } else {
            typeValue = UserEnum.getTypesEnum().USER;
        }
        this.setState({type: typeValue});
    }

    onChangeClientFirstName(ev) {
        ev.preventDefault();
        const client = Object.assign({}, this.state.clientData);
        client.firstName = ev.target.value;
        this.setState({clientData: client});
    }

    onChangeClientLastName(ev) {
        ev.preventDefault();
        const client = Object.assign({}, this.state.clientData);
        client.lastName = ev.target.value;
        this.setState({clientData: client});
    }

    onChangeClientPassword(ev) {
        ev.preventDefault();
        const client = Object.assign({}, this.state.clientData);
        client.password = ev.target.value;
        this.setState({clientData: client});
    }

    onChangeClientProperty(key, value) {
        const client = Object.assign({}, this.state.clientData);
        client[key] = value;
        this.setState({clientData: client});
    }

    onChangeUserProperty(key, value) {
        const client = Object.assign({}, this.state.userData);
        client[key] = value;
        this.setState({userData: client});
    }

    async backToLogin(ev) {
        ev.preventDefault();
        browserHistory.push('/');
    }

    async register(ev) {
        ev.preventDefault();
        const userData = this.state.type === UserEnum.getTypesEnum().CLIENT
            ? this.state.clientData
            : this.state.userData;
        const payload = Object.assign({}, userData);
        if (payload.birthdate) {
            payload.birthdate = new Date(payload.birthdate);
        }
        if(!userData.zodiac) delete userData.zodiac;
        if(!userData.gender) delete userData.gender;
        if(!userData.email) delete userData.email;

        userData.type = this.state.type;
        const result = await RegisterApi.register(userData);
        const data = result.data[this.state.type];
        data.type = this.state.type;
        localStorage.setItem('auth-token', result.data.token);
        localStorage.setItem('user-logged', JSON.stringify(data));
        browserHistory.push('/home');
    }

    render() {

        return (
            <div style={{width: 'auto', marginLeft: '40%', transform: 'translateX(-50%)'}}>
                <Card style={this.state.type === UserEnum.getTypesEnum().CLIENT ? cardStyleClient : cardStyleUser}>
                    <form>
                        <SelectField style={fieldStyle}
                                     floatingLabelText="User Type*"
                                     value={this.state.type}
                                     onChange={function (event, key, value) {
                                         this.setState({type: value});
                                     }.bind(this)}>
                            <MenuItem value={UserEnum.getTypesEnum().CLIENT}
                                      primaryText={'Client'}/>
                            <MenuItem value={UserEnum.getTypesEnum().USER} primaryText={'Expert'}/>
                        </SelectField>
                        {this.state.type === UserEnum.getTypesEnum().CLIENT ?

                            <div>
                                <TextField
                                    id="firstName"
                                    fullWidth={true}
                                    label="FirstName"
                                    style={fieldStyle}
                                    value={this.state.clientData.firstName}
                                    floatingLabelText={'First Name*'}
                                    onChange={ev => this.onChangeClientFirstName(ev)}/>

                                <TextField
                                    id="lastName"
                                    label="lastName"
                                    style={fieldStyle}
                                    value={this.state.clientData.lastName}
                                    floatingLabelText={'Last Name'}
                                    onChange={ev => this.onChangeClientLastName(ev)}/>

                                <SelectField style={fieldStyle}
                                             floatingLabelText="Zodic"
                                             value={this.state.clientData.zodiac}
                                             onChange={function (event, key, value) {
                                                 let newClientData = this.state.clientData;
                                                 newClientData.zodiac = value;
                                                 this.setState({clientData: newClientData});
                                             }.bind(this)}
                                >
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().AQUARIUS}
                                              primaryText={ZodiacEnum.getZodiacEnum().AQUARIUS}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().ARIES}
                                              primaryText={ZodiacEnum.getZodiacEnum().ARIES}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().CANCER}
                                              primaryText={ZodiacEnum.getZodiacEnum().CANCER}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().CAPRICORN}
                                              primaryText={ZodiacEnum.getZodiacEnum().CAPRICORN}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().GEMINI}
                                              primaryText={ZodiacEnum.getZodiacEnum().GEMINI}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().LEO}
                                              primaryText={ZodiacEnum.getZodiacEnum().LEO}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().LIBRA}
                                              primaryText={ZodiacEnum.getZodiacEnum().LIBRA}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().PISCES}
                                              primaryText={ZodiacEnum.getZodiacEnum().PISCES}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().SAGITTARIUS}
                                              primaryText={ZodiacEnum.getZodiacEnum().SAGITTARIUS}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().SCORPIO}
                                              primaryText={ZodiacEnum.getZodiacEnum().SCORPIO}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().TAURUS}
                                              primaryText={ZodiacEnum.getZodiacEnum().TAURUS}/>
                                    <MenuItem value={ZodiacEnum.getZodiacEnum().VIRGO}
                                              primaryText={ZodiacEnum.getZodiacEnum().VIRGO}/>
                                </SelectField>

                                <TextField
                                    id="birthdate"
                                    label="Birthdate"
                                    type="date"
                                    style={fieldStyle}
                                    onChange={ev => this.onChangeClientProperty('birthdate', ev.target.value)}
                                />

                                <TextField
                                    id="email"
                                    label="Email"
                                    style={fieldStyle}
                                    value={this.state.clientData.email}
                                    floatingLabelText={'Email*'}
                                    onChange={ev => this.onChangeClientProperty('email', ev.target.value)}/>

                                <SelectField style={fieldStyle}
                                             floatingLabelText="Gender"
                                             value={this.state.clientData.gender}
                                             onChange={function (event, key, value) {
                                                 let newClientData = this.state.clientData;
                                                 newClientData.gender = value;
                                                 this.setState({clientData: newClientData});
                                             }.bind(this)}>
                                    <MenuItem value={GenderEnum.getGenderEnum().NEUTER}
                                              primaryText={GenderEnum.getGenderEnum().NEUTER}/>
                                    <MenuItem value={GenderEnum.getGenderEnum().FEMININE}
                                              primaryText={GenderEnum.getGenderEnum().FEMININE}/>
                                    <MenuItem value={GenderEnum.getGenderEnum().MASCULINE}
                                              primaryText={GenderEnum.getGenderEnum().MASCULINE}/>
                                </SelectField>

                                <TextField
                                    id="password"
                                    type={"password"}
                                    label="password"
                                    style={fieldStyle}
                                    value={this.state.clientData.password}
                                    floatingLabelText={'Password*'}
                                    onChange={ev => this.onChangeClientPassword(ev)}/>

                            </div> : null}

                        {this.state.type !== UserEnum.getTypesEnum().CLIENT ?

                            <div>
                                <TextField
                                    id="name"
                                    label="name"
                                    style={fieldStyle}
                                    value={this.state.userData.name}
                                    floatingLabelText={'Name*'}
                                    onChange={ev => this.onChangeUserProperty('name', ev.target.value)}/>

                                <TextField
                                    id="memberNo"
                                    label="MemberNo"
                                    style={fieldStyle}
                                    value={this.state.userData.memberNo}
                                    floatingLabelText={'MemberNo*'}
                                    onChange={ev => this.onChangeUserProperty('memberNo', ev.target.value)}/>

                                <TextField
                                    id="email"
                                    label="Email"
                                    style={fieldStyle}
                                    value={this.state.userData.email}
                                    floatingLabelText={'Email'}
                                    onChange={ev => this.onChangeUserProperty('email', ev.target.value)}/>

                                <TextField
                                    id="password"
                                    type={"password"}
                                    label="password"
                                    style={fieldStyle}
                                    value={this.state.userData.password}
                                    floatingLabelText={'Password*'}
                                    onChange={ev => this.onChangeUserProperty('password', ev.target.value)}
                                />


                            </div> : null}


                        <RaisedButton type="button" label="Back to Login" onClick={this.backToLogin.bind(this)}
                                      style={buttonStyle} primary={false}/>

                        <RaisedButton type="button" label="Register" onClick={this.register.bind(this)}
                                      style={buttonStyle} primary={true}
                                      disabled={!this.state.type ||
                                      (this.state.type === UserEnum.getTypesEnum().CLIENT ?
                                              (!this.state.clientData.firstName ||
                                                  !this.state.clientData.email ||
                                                  !this.state.clientData.password)
                                              :
                                              (!this.state.userData.name
                                                  || !this.state.userData.memberNo
                                                  || !this.state.userData.password))}/>
                    </form>
                </Card>
            </div>
        );
    }
}