module.exports = function (client) {

    let greetData = {
        name: '',
        lang: '',
        greeting: ''
    };
    let namesGreeted = [];

    //fix the format of the name
    let fixName = function (inputName) {
        console.log('name to fix : ' + inputName)

        inputName = inputName.toString().toLowerCase();
        let tmpString = inputName.substr(1, inputName.length);
        let firstCh = inputName.charAt(0).toUpperCase();
        let correctName = firstCh + tmpString;
        return correctName;
    };

    let setName = function (name) {
        greetData.name = fixName(name);
    }
    let setLang = function (language) {
        greetData.lang = language;
    }
    //greet a user given name and language
    let greetUser = function () {
        let name = greetData.name;
        let language = greetData.lang;


        client.connect()
            .then(() => {
                console.log('connected to database successfully');
                const sql = 'SELECT id FROM users WHERE username=$1';
                const params = [name];
                // const params = [req.body.userEnteredName];
                // return
                return client.query(sql, params);
                // console.log(data);

            })
            .then((result) => {
                if (result.rows.length == 0) {
                    const sql = 'INSERT into users (username,greet_count) values ($1,$2)';
                    const params = [name, 1];
                    client.query(sql, params)
                }

                if (result.rows.length == 1) {
                    const sql = 'UPDATE users SET greet_count = greet_count+1 WHERE username=$1';
                    const params = [name];
                    client.query(sql, params);

                }
            })
            .catch((err) => console.error(err))

        //return a greeting based on the given language
        if (language === 'English') {
            greetData.greeting = 'Hello ' + name + '!'
        };
        if (language === 'Zulu') {

            greetData.greeting = 'Saubona ' + name + '!'
        };

        if (language === 'Tsonga') {

            greetData.greeting = 'Avuxeni ' + name + '!'
        };
    };
    // function that counts the number of times a user has been greeted

    function counter() {
        return client.query('SELECT * FROM users')
            .then((result) => {
                return result.rowCount
            })
    }

    let greeted = function (name) {
        if (name == 'allUsers') {
            return client.query('SELECT * FROM users')
                .then((result) => {
                    return result.rows
                })
        } else {

            return client.query('SELECT * FROM users WHERE username=$1', [name])
                .then((result) => {
                    return result.rows
                })

        }



    }

    return {
        language: setLang,
        name: setName,
        greet: greetUser,
        format: fixName,
        counter,
        greetData,
        namesGreeted,
        greeted

    }


}