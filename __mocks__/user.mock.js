/**
 * Import Module Dependencies.
 */



/**
 * Array of test objects that should work for insert into database.
 * @type {{bor: string, namn: string, adress: string, info: string}}
 */
const testObjects = [
    {
        firstname: "TestFirstname1",
        lastname: "TestLastname1",
        contact: {
            email: "TestEmail@Example.test1",
            phone: "0703332210",
        },
        adress: {
            street: "TestStreet1",
            streetnr: "101test",
            postnr: "12345",
            city: "TestCity1",
            country: "TestCountry1",
        },
        status: "created",
    },
    {
        firstname: "TestFirstname2",
        lastname: "TestLastname2",
        contact: {
            email: "TestEmail@Example.test2",
            phone: "0703332211"
        },
        adress: {
            street: "TestStreet2",
            streetnr: "101test",
            postnr: "12345",
            city: "TestCity2",
            country: "TestCountry2"
        },
        status: "created"
    },
    {
        firstname: "TestFirstname3",
        lastname: "TestLastname3",
        contact: {
            email: "TestEmail@Example.test3",
            phone: "0703332212",
        },
        adress: {
            street: "TestStreet3",
            streetnr: "101test",
            postnr: "12345",
            city: "TestCity3",
            country: "TestCountry3",
        },
        status: "created",
    }
]


/**
 * For testing to create new object in database with.
 * @type {{author: string, text: string, title: string, category: string, status: string}}
 */
const newTestObject = {
    firstname: "TestFirstname4",
    lastname: "TestLastname4",
    email: "TestEmail@Example.test4",
    phone: "0703332214",
    street: "TestStreet4",
    streetnr: "101test",
    postnr: "12345",
    city: "TestCity4",
    country: "TestCountry4",
    status: "created"
}


/**
 * Array of test objects that should fail on insert to database due to unfilled required data. Each object is a combination of missing fields.
 * @type {[{namn: string, adress: string, info: string}, {bor: string, adress: string, info: string}, {adress: string, info: string}]}
 */
const testObjectsFailing = [
    {
        lastname: "TestLastname_Failing",
        email: "TestEmail@Example.test_Failing",
        phone: "0703332213_Failing",
        street: "TestStreet_Failing",
        streetnr: "101test_Failing",
        postnr: "12345_Failing",
        city: "TestCity_Failing",
        status: "created"
    },
    {
        firstname: "TestFirstname_Failing",
        email: "TestEmail@Example.test_Failing",
        phone: "0703332213_Failing",
        street: "TestStreet_Failing",
        streetnr: "101test_Failing",
        postnr: "12345_Failing",
        city: "TestCity_Failing",
        status: "created"
    },
    {
        firstname: "TestFirstname_Failing",
        lastname: "TestLastname_Failing",
        phone: "0703332213_Failing",
        street: "TestStreet_Failing",
        streetnr: "101test_Failing",
        postnr: "12345_Failing",
        city: "TestCity_Failing",
        status: "created"
    },
    {
        firstname: "TestFirstname_Failing",
        lastname: "TestLastname_Failing",
        email: "TestEmail@Example.test_Failing",
        phone: "0703332213_Failing",
        street: "TestStreet_Failing",
        streetnr: "101test_Failing",
        postnr: "12345_Failing",
        city: "TestCity_Failing"
    },
    {
        phone: "0703332213_Failing",
        street: "TestStreet_Failing",
        streetnr: "101test_Failing",
        postnr: "12345_Failing",
        city: "TestCity_Failing"
    }
]



/**
 * Getter function to return a test object.
 * @return {{bor: string, namn: string, adress: string, info: string}}
 */
function getTestObjects() {
    return testObjects;
}


/**
 * Getter function to return a new test object for creating new objects in database.
 * @return {{author: string, text: string, title: string, category: string, status: string}}
 */
function getNewTestObject() {
    return newTestObject;
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
    getNewTestObject,
    getTestObjectsFailing
}
