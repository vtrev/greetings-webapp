let assert = require('assert');
let greetingsModule = require('../GreetFactory');

describe('greetUser function', function () {
    it('Should correctly greet Kundi in English', function () {

        let greetings = greetingsModule();
        greetings.name('Kundi');
        greetings.language('English');
        assert.equal(greetings.greet(), 'Hello Kundi!');

    });
    it('Should correctly greet Vusi in XiTsonga', function () {

        let greetings = greetingsModule();
        greetings.name('Vusi');
        greetings.language('Tsonga');
        assert.equal(greetings.greet(), 'Avuxeni Vusi!');

    });
    it('Should correctly greet Maanda in isiZulu', function () {

        let greetings = greetingsModule();
        greetings.name('Maanda');
        greetings.language('Zulu');
        assert.equal(greetings.greet(), 'Saubona Maanda!');

    });
});


describe('Name formating', function () {
    it('Should  return Vusi\'s name in the format Name even if a lowercase name was passed in ', function () {
        let greetings = greetingsModule();

        assert.equal(greetings.format('vusi'), 'Vusi');

    });
    it('Should  return Nompumelelo\'s name in the format Name even if a miXEdCasE name was passed in ', function () {
        let greetings = greetingsModule();
        assert.equal(greetings.format('NoMpUmElElo'), 'Nompumelelo');

    });
    it('Should  return Maanda\'s name in the format Name even if an UPPERCASE name was passed in ', function () {
        let greetings = greetingsModule();
        assert.equal(greetings.format('MAANDA'), 'Maanda');

    });
});




describe('counter function', function () {
    it('Should return an object with name Kundi with a greet count of 2 ', function () {
        let greetings = greetingsModule();
        greetings.name('Kundi');
        greetings.language('English');
        greetings.greet();
        greetings.greet();
        assert.deepEqual(greetings.namesGreeted[0], {
            name: 'Kundi',
            count: 2
        })

    });
    it('Should return an object with name Uhone with a greet count of 3', function () {
        let greetings = greetingsModule();
        greetings.name('Uhone');
        greetings.language('English');
        greetings.greet();
        greetings.greet();
        greetings.greet();

        assert.deepEqual(greetings.namesGreeted[0], {
            name: 'Uhone',
            count: 3
        })

    });
    it('Should return an object with name Vusi with a  greet count of 5 ', function () {
        let greetings = greetingsModule();
        greetings.name('Vusi');
        greetings.language('English');
        greetings.greet();
        greetings.greet();
        greetings.greet();
        greetings.greet();
        greetings.greet();
        assert.deepEqual(greetings.namesGreeted[0], {
            name: 'Vusi',
            count: 5
        })

    });
});

describe('userSpecificCounter function', function () {
    it('Should return a list with one object of the requested user\'s data ', function () {
        let greetings = greetingsModule();
        greetings.name('Vusi');
        greetings.language('English');
        greetings.greet();
        greetings.greet();
        greetings.name('Refresher');
        greetings.language('Zulu');
        greetings.greet();
        greetings.greet();
        greetings.greet();

        assert.deepEqual(greetings.userSpecCounter('Refresher')[0], {
            name: 'Refresher',
            count: 3
        });

    });

});