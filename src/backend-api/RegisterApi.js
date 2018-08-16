import UserEnum from "../enums/UserEnum";

export default class RegisterApi {

    static async register(data) {

        const userRoute = data.type === UserEnum.getTypesEnum().CLIENT
            ? 'clients'
            : 'users';

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        return fetch(`http://localhost:3001/${userRoute}/registration/`, requestInfo)
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

