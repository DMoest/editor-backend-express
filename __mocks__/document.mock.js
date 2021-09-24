/**
 * Import Module Dependencies.
 */



/**
 * Array of test objects that should work for insert into database.
 * @type {{bor: string, namn: string, adress: string, info: string}}
 */
const testObjects = [
    {
        author: "TestAuthor1",
        title: "TestTitle1",
        category: "TestCategory1",
        text: "TestTextInput1",
        status: "created"
    },
    {
        author: "TestAuthor2",
        title: "TestTitle2",
        category: "TestCategory2",
        text: "TestTextInput2",
        status: "created"
    },
    {
        author: "TestAuthor3",
        title: "TestTitle3",
        category: "TestCategory3",
        text: "TestTextInput3",
        status: "created"
    }
]


/**
 * For testing to create new object in database with.
 * @type {{author: string, text: string, title: string, category: string, status: string}}
 */
const newTestObject = {
    author: "TestAuthor4",
    title: "TestTitle4",
    category: "TestCategory4",
    text: "TestTextInput4",
    status: "created"
}


/**
 * Array of test objects that should fail on insert to database due to unfilled required data. Each object is a combination of missing fields.
 * @type {[{namn: string, adress: string, info: string}, {bor: string, adress: string, info: string}, {adress: string, info: string}]}
 */
const testObjectsFailing = [
    {
        title: "TestTitle1",
        category: "TestCategory1",
        text: "TestTextInput1"
    },
    {
        author: "TestAuthor2",
        category: "TestCategory2",
        text: "TestTextInput2"
    },
    {
        category: "TestCategory3",
        text: "TestTextInput3"
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
