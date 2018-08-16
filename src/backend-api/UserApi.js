export default class UserApi {

    static async getClientsWithQuestion(userId) {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };
        return fetch(`http://localhost:3001/users/${userId}/clients`, requestInfo)
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    return result;
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    };

    static async getQuestionsForClient(userId, clientId) {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        return fetch(`http://localhost:3001/users/${userId}/client/${clientId}/questions`, requestInfo)
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    return result;
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    };

    static async sendAnswer(data) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        return fetch(`http://localhost:3001/answers`, requestInfo)
            .then(async response => {
                const result = await response.json();
                if (response.ok) {
                    return result;
                } else {
                    throw new Error(result.message);
                }
            })
            .catch(err => {
                throw new Error(err);
            });
    };
}

