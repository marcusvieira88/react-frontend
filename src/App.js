import React, {Component} from 'react';
import {browserHistory} from 'react-router';
import AppBar from 'material-ui/AppBar';
import {List, ListItem} from 'material-ui/List';
import NotificationIcon from 'material-ui/svg-icons/social/notifications';
import LogoutIcon from 'material-ui/svg-icons/action/exit-to-app';
import ContentSend from 'material-ui/svg-icons/content/send';
import IconButton from 'material-ui/IconButton';
import HomeExpert from './componentes/HomeExpert';
import HomeClient from './componentes/HomeClient';
import UserEnum from "./enums/UserEnum";
import WebSocketService from './websockets/WebSocketService'


class App extends Component {
    userProfile = null;

    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            showNotifications: false,
        };
        this.props.routes[0].NotificationManager.setListener(this);
    }

    setNotifications(newNotifications) {
        this.setState({notifications: newNotifications});
    }

    componentWillMount() {
        this.userProfile = JSON.parse(localStorage.getItem('user-logged'));
    }

    componentDidMount() {
        const user = JSON.parse(localStorage.getItem('user-logged'));
        this.webSocket = WebSocketService.getInstance();
        this.webSocket.initialize(localStorage.getItem('auth-token'), this.props.routes[0].NotificationManager);
        this.webSocket.requestStoredNotifications(user.id);
    }

    render() {

        const barStyle = {position: 'fixed'};
        return (

            <div className="main">
                <AppBar
                    style={barStyle}
                    iconElementRight={<div>
                        {this.state.notifications.length > 0
                            ? <div style={{
                                borderRadius: '10px',
                                backgroundColor: 'aqua',
                                width: '20px',
                                fontSize: '12px',
                                padding: '3px',
                                position: 'absolute',
                                textAlign: 'center',
                            }}>
                                {this.state.notifications.length}
                            </div>
                            : null}

                        <IconButton onClick={ev => {
                            this.setState({showNotifications: !this.state.showNotifications});
                        }}>
                            <NotificationIcon color={'white'}/>
                        </IconButton>
                        {this.state.showNotifications
                            ? <List style={{
                                position: 'absolute',
                                width: '450px',
                                right: '20px',
                                backgroundColor: '#eee',
                                top: '64px',
                            }}>
                                {this.state.notifications.map((item, idx) =>
                                    <ListItem
                                        key={`not.id.${idx}`}
                                        primaryText={item.text}
                                        leftIcon={<ContentSend/>}
                                        onClick={ev => {
                                            this.webSocket.setNotificationsAsRead(this.userProfile.id, item.id)
                                        }}
                                    />
                                )}
                            </List>
                            : null}
                        <IconButton onClick={ev => {
                            ev.preventDefault();
                            localStorage.removeItem('auth-token');
                            localStorage.removeItem('user-logged');
                            browserHistory.push('/');
                        }}>
                            <LogoutIcon color={'white'}/>
                        </IconButton>
                    </div>}
                />
                {this.userProfile.type === UserEnum.getTypesEnum().CLIENT
                    ? <HomeClient/>
                    : <HomeExpert/>
                }
            </div>

        );
    }
}

export default App;
