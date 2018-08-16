export default class ClientApi {

    static async getAllUsers() {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        return fetch(`http://localhost:3001/users`, requestInfo)
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

    static async getQuestionsForUser(clientId, userId) {
        const requestInfo = {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        return fetch(`http://localhost:3001/clients/${clientId}/expert/${userId}/questions`, requestInfo)
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

    static async sendQuestion(data) {
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('auth-token')
            })
        };

        return fetch(`http://localhost:3001/questions`, requestInfo)
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

