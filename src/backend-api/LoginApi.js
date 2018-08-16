export default class LoginApi {

    static async authenticate(data) {

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        return fetch('http://localhost:3001/authenticate/', requestInfo)
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

