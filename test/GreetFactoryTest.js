'use strict'

const assert = require('assert');
const greetings = require('../services/GreetFactory');
const pg = require("pg");
const Pool = pg.Pool;
const pool = new Pool({
    user: 'vusi',
    host: '192.168.0.33',
    database: 'greetings',
    password: '8423',
    port: 5432
});

const greet = greetings(pool);

describe('Greetings web app', function () {
    beforeEach(async function () {
        await pool.query('delete from users;');
    });
    // Testing case
    it('Should greet Uhone with proper name case(Name) when given a all lowercase name', async function () {
        await greet.name('uhone');
        await greet.language('English');
        assert.equal(await greet.greet(), 'Hello Uhone!');
    });

    it('Should greet Vusi with proper name case(Name) when given a all UPPERCASE name', async function () {
        await greet.name('VUSI');
        await greet.language('English');
        assert.equal(await greet.greet(), 'Hello Vusi!');
    })

    // Testing languages

    it('Should greet Nompumelelo in English', async function () {
        await greet.name('Nompumelelo');
        await greet.language('English');
        assert.equal(await greet.greet(), 'Hello Nompumelelo!');
    });
    it('Should greet Nompumelelo in xiTsonga', async function () {
        await greet.name('Julia');
        await greet.language('Tsonga');
        assert.equal(await greet.greet(), 'Avuxeni Julia!');
    });
    it('Should greet Maanda in Afrikaans', async function () {
        await greet.name('Maanda');
        await greet.language('Zulu');
        assert.equal(await greet.greet(), 'Saubona Maanda!');
    });

    // Testing for insertions && counts
    it('Should add a user into the database when greeting', async function () {
        await greet.name('Vusi');
        await greet.language('English');
        await greet.greet();
        let result = await greet.greetedUsers('Vusi');
        assert.equal(result.username, 'Vusi');
    });

    it('Should return a count of all people greeted', async function () {
        await greet.name('Vusi');
        await greet.language('English');
        await greet.greet();
        await greet.name('Mpume');
        await greet.language('English');
        await greet.greet();
        await greet.name('Mandaa');
        await greet.language('English');
        await greet.greet();

        let result = await greet.getCounter();
        assert.equal(result, 3);
    });
    it('Should return the correct number of times a certain user was greeted', async function () {
        await greet.name('Vusi');
        await greet.language('English');
        await greet.greet();
        await greet.greet();
        await greet.greet();
        await greet.greet();
        await greet.name('Mpume');
        await greet.language('English');
        await greet.greet();
        await greet.name('Mandaa');
        await greet.language('English');
        await greet.greet();

        let result = await greet.greetedUsers('Vusi');
        assert.equal(result.greet_count, 4);
    });


});