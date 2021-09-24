/**
 * Import Module Dependencies.
 */



/**
 * Array of test objects that should work for insert into database.
 * @type {{bor: string, namn: string, adress: string, info: string}}
 */
const testObjects = [
    {
        namn: "Testperson1",
        bor: "Testcity1",
        adress: "Teststreet1",
        info: "Testinformation1"
    },
    {
        namn: "Testperson2",
        bor: "Testcity2",
        adress: "Teststreet2",
        info: "Testinformation2"
    },
    {
        namn: "Testperson3",
        bor: "Testcity3",
        adress: "Teststreet3",
        info: "Testinformation3"
    }
]


/**
 * Array of test objects that should fail on insert to database due to unfilled required data. Each object is a combination of missing fields.
 * @type {[{namn: string, adress: string, info: string}, {bor: string, adress: string, info: string}, {adress: string, info: string}]}
 */
const testObjectsFailing = [
    {
        namn: "Testperson_not_complete_1",
        adress: "Teststreet_not_complete_1",
        info: "Testinformation_not_complete_1"
    },
    {
        bor: "Testcity_not_complete_2",
        adress: "Teststreet_not_complete_2",
        info: "Testinformation_not_complete_2"
    },
    {
        adress: "Teststreet_not_complete_3",
        info: "Testinformation_not_complete_3"
    }
]


/**
 * @description Getter function to return a test object.
 * @return {{bor: string, namn: string, adress: string, info: string}}
 */
function getTestObjects() {
    return testObjects;
}


/**
 * Getter function to return a failing test object.
 * @return {{bor: string, adress: string, info: string}}
 */
function getTestObjectsFailing() {
    return testObjectsFailing;
}


/**
 * Module Exports.
 * @type {{getTestObject: (function(): {bor: string, namn: string, adress: string, info: string})}}
 */
module.exports = {
    getTestObjects,
    getTestObjectsFailing
}
