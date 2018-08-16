class GenderEnum {

    /**
     * Represent the genders
     */
    static getGenderEnum() {
        return {
            MASCULINE: 'masculine',
            FEMININE: 'feminine',
            NEUTER: 'neuter',
            prop: {
                'masculine': {name: 'masculine'},
                'feminine': {name: 'feminine'},
                'neuter': {name: 'neuter'}
            }
        };
    }
}

module.exports = GenderEnum;

