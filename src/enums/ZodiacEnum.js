class ZodiacEnum {

    /**
     * Represent the zodiac signs
     */
    static getZodiacEnum() {
        return {
            ARIES: 'aries',
            TAURUS: 'taurus',
            GEMINI: 'gemini',
            CANCER: 'cancer',
            LEO: 'leo',
            VIRGO: 'virgo',
            LIBRA: 'libra',
            SCORPIO: 'scorpio',
            SAGITTARIUS: 'sagittarius',
            CAPRICORN: 'capricorn',
            AQUARIUS: 'aquarius',
            PISCES: 'pisces',
            prop: {
                'aries': {name: 'aries', url: ''},
                'taurus': {name: 'taurus', url: ''},
                'gemini': {name: 'gemini', url: ''},
                'cancer': {name: 'cancer', url: ''},
                'leo': {name: 'leo', url: ''},
                'virgo': {name: 'virgo', url: ''},
                'libra': {name: 'libra', url: ''},
                'scorpio': {name: 'scorpio', url: ''},
                'sagittarius': {name: 'sagittarius', url: ''},
                'capricorn': {name: 'capricorn', url: ''},
                'aquarius': {name: 'aquarius', url: ''},
                'pisces': {name: 'pisces', url: ''}
            }
        };
    }
}

module.exports = ZodiacEnum;
