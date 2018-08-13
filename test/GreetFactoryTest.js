let assert = require('assert');
let greetings = require('../GreetFactory');

describe('greetNow function', function () {
    it('Should greet any name that is sent into the factory in the specified language', function () {
        let greetDataEnglish = {
            name: 'Kundi',
            'lang': 'English'
        };
        let greetDataTsonga = {
            name: 'Anko',
            lang: 'Tsonga'
        };
        let greetDataZulu = {
            name: 'Ori',
            'lang': 'Zulu'
        };

        assert.equal(greetings(greetDataEnglish).greet, 'Hello Kundi!');

        assert.equal(greetings(greetDataTsonga).greet, 'Avuxeni Anko!');

        assert.equal(greetings(greetDataZulu).greet, 'Saubona Ori!');

    });
});


describe('Name formating', function () {
    it('Should always greet the user with the name in format Name even if they input mixed cases', function () {
        let greetData = {
            name: 'vusi' //lowercase
                ,
            lang: 'English'
        };
        let greetData1 = {
            name: 'VuSi' //mixedcase
                ,
            lang: 'English'
        };

        assert.equal(greetings(greetData1).greet, 'Hello Vusi!')
    });
});