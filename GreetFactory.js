// the greetings factory function 

module.exports = function () {

    let greetNow = function (greetData) {
        let inputName = greetData.name;
        let language = greetData.lang;

        //fix the format of the name
        inputName = inputName.toLowerCase();
        let tmpString = inputName.substr(1, inputName.length);
        let firstCh = inputName.charAt(0).toUpperCase();
        inputName = firstCh + tmpString

        //counter init
        // if (localStorage['counter'] === undefined) {
        //     localStorage.setItem('counter', JSON.stringify(0));
        // }

        // if (greetMap[inputName] === undefined) {
        //     greetMap[inputName] = 0;
        //     var counter = JSON.parse(localStorage.getItem('counter'));
        //     //increament to the counter if the user has not been registered to the map
        //     localStorage.setItem('counter', JSON.parse(counter + 1));

        // }
        //return a greeting based on the given language
        if (language === 'English') {
            return 'Hello ' + inputName + '!'
        };
        if (language === 'Zulu') {

            return 'Saubona ' + inputName + '!'


        };

        if (language === 'Tsonga') {

            return 'Avuxeni ' + inputName + '!'


        };
    };

    //function that returns the checked language button 
    // let setLang = function (value) {
    //     var lang = '';
    //     if (value === 'English') {
    //         lang = 'English';
    //     }
    //     if (value === 'Zulu') {
    //         lang = 'Zulu';
    //     }
    //     if (value === 'Tsonga') {
    //         lang = 'Tsonga';
    //     }
    //     return lang
    // }
    //factory returns

    return {
        greetNow,
    }


}