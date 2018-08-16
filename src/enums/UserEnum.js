class UserEnum {

    /**
     * Represent the user types
     */
    static getTypesEnum() {
        return {
            USER: 'user',
            CLIENT: 'client',
            prop: {
                'user': {name: 'user'},
                'client': {name: 'client'}
            }
        };
    }
}

module.exports = UserEnum;

