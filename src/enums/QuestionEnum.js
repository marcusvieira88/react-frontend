class QuestionEnum {

    /**
     * Represent the question status
     */
    static getStatusEnum() {
        return {
            ANSWERED: 'answered',
            OPEN: 'open',
            prop: {
                'answered': {name: 'answered'},
                'open': {name: 'open'}
            }
        };
    }
}

module.exports = QuestionEnum;
