// the greetings factory function 

module.exports = function (greetData) {

    let greetNow = function () {
        let inputName = greetData.name;
        let language = greetData.lang;


        //fix the format of the name
        inputName = inputName.toLowerCase();
        let tmpString = inputName.substr(1, inputName.length);
        let firstCh = inputName.charAt(0).toUpperCase();
        inputName = firstCh + tmpString


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


    //factory returns

    return {
        greet: greetNow()
    }


}