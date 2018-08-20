module.exports = function () {
    let greetData = {
        name: '',
        lang: ''
    };
    let namesGreeted = [];
    let setName = function (name) {
        greetData.name = name;
    }
    let setLang = function (language) {
        greetData.lang = language;
    }

    //fix the format of the name
    let fixName = function (inputName) {
        inputName = inputName.toLowerCase();
        let tmpString = inputName.substr(1, inputName.length);
        let firstCh = inputName.charAt(0).toUpperCase();
        let correctName = firstCh + tmpString;
        return correctName;
    };
    //greet a user given name and language
    let greetUser = function () {
        let name = greetData.name;
        let language = greetData.lang;

        //return a greeting based on the given language
        if (language === 'English') {
            counter(name);
            return 'Hello ' + name + '!'
        };
        if (language === 'Zulu') {
            counter(name);
            return 'Saubona ' + name + '!'
        };

        if (language === 'Tsonga') {
            counter(name);
            return 'Avuxeni ' + name + '!'
        };
    };

    //function that creates a user
    let createUser = function (name) {
        let tmpNameObject = {};
        tmpNameObject['name'] = name;
        tmpNameObject['count'] = 1;
        return tmpNameObject
    };

    // function that counts the number of times a user has been greeted
    let counter = function (name) {
        name = fixName(name);

        let namesLength = namesGreeted.length;

        if (namesLength == 0) {
            namesGreeted.push(createUser(name));
        } else if (!namesGreeted.some(function (storedNames) {
                return storedNames.name === name
            })) {
            namesGreeted.push(createUser(name));

        } else {
            for (let i = 0; i < namesGreeted.length; i++) {
                if (namesGreeted[i].name == name) {
                    namesGreeted[i].count++;
                }
            }
        }
        // return namesGreeted;
    };

    let userSpecCounter = function (username) {
        return namesGreeted.filter(function (data) {
            return data.name == username
        })
    };


    return {
        language: setLang,
        name: setName,
        greet: greetUser,
        format: fixName,
        counter,
        greetData,
        namesGreeted,
        userSpecCounter

    }


}