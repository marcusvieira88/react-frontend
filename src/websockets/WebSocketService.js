import io from 'socket.io-client';
import {browserHistory} from 'react-router';

class NotificationsSocket {
    websocket;

    constructor(socketInstance, NotificationManager) {
        this.websocket = socketInstance;
        this.NotificationManager = NotificationManager;

        this.websocket.setListener('initial_notifications', async (data) => {
            this.NotificationManager.clearNotifications();
            this.NotificationManager.addNotifications(data.data);
        });

        this.websocket.setListener('new_notification', async (data) => {
            this.NotificationManager.addNotifications(data.data);
        });
    }
}

export default class WebSocketService {

    webSocketInitialized = false;
    socket;
    notificationsInterface;
    static instance = null;

    static getInstance() {
        if (this.instance === null) {
            this.instance = new WebSocketService();
        }
        return this.instance;
    }

    initialize(token, NotificationManager) {
        if (!this.webSocketInitialized) {

            let host = 'http://localhost:3001';
            console.log("WebSocketService :: initialize : ", host);

            //Initialize the socket
            this.socket = io.connect(host, {
                query: 'token=' + token
            });

            this.socket.on("unauthorized", function (error, callback) {
                if (error.data.type === "UnauthorizedError" || error.data.code === "invalid_token") {
                    browserHistory.push('/');
                }
            });

            this.socket.on("error", function (error) {
                if (error.type === "UnauthorizedError" || error.code === "invalid_token") {
                    browserHistory.push('/');
                }
            });
            this.notificationsInterface = new NotificationsSocket(this, NotificationManager);
            this.webSocketInitialized = true;
        }
    }

    setListener(event, callback) {
        this.socket.on(event, (data) => {
            callback(data)
        });
    }

    requestStoredNotifications(userId) {
        this.socket.emit('get_store_notifications', userId);
    }

    setNotificationsAsRead(userId, notificationId) {
        const payload = {receiverId: userId, notificationId: notificationId, readAt: new Date()};
        this.socket.emit('notification_read', payload);
    }

    emit(event, data = {}) {
        this.socket.emit(event, data);
    }

    destroy() {
        if(this.socket) {
            this.socket.disconnect();
            this.socket.destroy();
        }
        this.webSocketInitialized = false;
        this.instance = null;
    }
}
