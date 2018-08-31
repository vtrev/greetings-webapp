module.exports = function (client) {
    // placeholding object
    let greetData = {
        name: '',
        lang: '',
        greeting: ''
    };
    //fix the format of the name
    let fixName = function (inputName) {
        inputName = inputName.toString().toLowerCase();
        let tmpString = inputName.substr(1, inputName.length);
        let firstCh = inputName.charAt(0).toUpperCase();
        let correctName = firstCh + tmpString;
        return correctName;
    };

    // setter functions
    let setName = function (name) {
        greetData.name = fixName(name);
    }
    let setLang = function (language) {
        greetData.lang = language;
    }

    //return greeting given name and language
    let greetNow = function (name, language) {
        if (language === 'English') {
            return 'Hello ' + name + '!';
        };
        if (language === 'Zulu') {

            return 'Saubona ' + name + '!';
        };

        if (language === 'Tsonga') {

            return 'Avuxeni ' + name + '!';
        };
    };

    let processGreeting = async function () {
        let name = greetData.name;
        let language = greetData.lang;
        const sql = 'SELECT id FROM users WHERE username=$1';
        const params = [name];
        let result = await client.query(sql, params);

        if (result.rows.length == 0) {
            const sql = 'INSERT into users (username,greet_count) values ($1,$2)';
            const params = [name, 1];
            let result = await client.query(sql, params);
            return await greetNow(name, language);
        };
        if (result.rows.length == 1) {
            const sql = 'UPDATE users SET greet_count = greet_count+1 WHERE username=$1';
            const params = [name];
            let result = await client.query(sql, params);
            return await greetNow(name, language);
        };
    };

    // return greeted user/all users
    let greetedUsers = async function (name) {
        let result = await client.query('SELECT * FROM users');
        if (name == 'allUsers') {
            return await result.rows.reverse();
        } else {
            const params = [name];
            const sql = ('SELECT * FROM users WHERE username=$1');
            let result = await client.query(sql, params)
            return await result.rows[0];
        };
    };

    // return counter
    let counter = async function () {
        let sql = ('SELECT id FROM users');
        let result = await client.query(sql);
        return result.rowCount
    };
    return {
        language: setLang,
        name: setName,
        greet: processGreeting,
        format: fixName,
        greetData,
        getCounter: counter,
        greetedUsers
    };
};
// =======================================================================EOF======================================================================