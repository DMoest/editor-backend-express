/**
 * Import Test Module Dependencies.
 */
const request = require('supertest');
const app = require('../app');
const testRoute = '/document';
const testDb = require('../__mocks__/database.mock');
const dbModel = require('./../src/db/models/document.model');
const testMock = require('../__mocks__/document.mock');
const testObjects = testMock.getTestObjects();
const newTestObject = testMock.getNewTestObject();
const testObjectsFailing = testMock.getTestObjectsFailing()



/**
 * Test Suit for all CRUD requests on tested route.
 * --------------------------------------------------
 */
describe(`TestSuit: Tests all the CRUD requests on route('${testRoute}')`, () => {

    /**
     * Setup before each test case.
     */
    beforeEach(async () => {
        console.log(`Before each test case for ${testRoute} -> connect to test database.`)
        // Should connect to test database and insert some objects for testing purposes...

        await testDb.connectToTestDb()
        await dbModel.Document.create(testObjects);
    })


    /**
     * Tear down after each test case.
     */
    afterEach(async () => {
        console.log(`After each test case for  ${testRoute}`)
        // Should close connection and teardown test database to prevent open handles

        await testDb.dropTestDb()
    })



    /**
     * Test Case for GET Requests.
     * ------------------------------
     */
    describe(`Test Case for GET Requests on route('${testRoute}')`, () => {

        /**
         * Test response status code and content type JSON.
         */
        test(`Test -> Should responde to a GET('${testRoute}') request that returns a JSON object containing a success status code 200.`, async () => {
            let response = await request(app)
                .get(testRoute)

            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })


        /**
         * Test response for searching the database with a GET request on route with URL-params of ID.
         */
        test(`Test -> Should responde to a GET('${testRoute}/:id') request that returns a JSON object containing a success status code 200.`, async () => {
            let response1 = await request(app)
                .get(testRoute)

            expect(response1.statusCode).toBe(200);
            expect(response1.headers['content-type']).toEqual(expect.stringContaining('json'));

            let response2 = await request(app)
                .get(`${testRoute}/${response1.body[0]._id}`)

            expect(response2.statusCode).toBe(200);
            expect(response2.headers['content-type']).toEqual(expect.stringContaining('json'));
            expect(response2.body).toHaveProperty('_id')
            expect(response2.body).toHaveProperty('author')
            expect(response2.body).toHaveProperty('title')
            expect(response2.body).toHaveProperty('category')
            expect(response2.body).toHaveProperty('text')
            expect(response2.body).toHaveProperty('status')
            expect(response2.body).toHaveProperty('createdAt')
            expect(response2.body).toHaveProperty('updatedAt')
        })


        /**
         * Test response status code on a expected to fail serach with request body params.
         */
        test(`Test -> Should responde to a failing GET('${testRoute}/:id') request that returns unsuccessful status code 500.`, async () => {
            let response = await request(app)
                .get(`${testRoute}/thisIsTheFailingIDString`)

            expect(response.statusCode).toBe(500);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        })
    })



    /**
     * Test Case for POST Requests.
     * ------------------------------
     */
    describe(`TestCase: POST requests on route('${testRoute}').`, () => {

        /**
         * Test response status code and content type JSON.
         */
        test(`Test -> Should respond to a POST('${testRoute}') request that returns a JSON object containing a success status code 201.`, async () => {
            let response = await request(app)
                .post(testRoute).send(newTestObject)

            expect(response.statusCode).toBe(201);
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });


        /**
         * Test response body for expected properties existence.
         */
        test(`Test -> Should respond to POST request. Response object body should contain expected properties. `, async () => {
            let response = await request(app)
                .post(testRoute).send(newTestObject)

                expect(response.body).toHaveProperty('_id')
                expect(response.body).toHaveProperty('author')
                expect(response.body).toHaveProperty('title')
                expect(response.body).toHaveProperty('category')
                expect(response.body).toHaveProperty('text')
                expect(response.body).toHaveProperty('status')
                expect(response.body).toHaveProperty('createdAt')
                expect(response.body).toHaveProperty('updatedAt')
        });


        /**
         * Test response body properties for expected type of value.
         */
        test(`Test -> Should respond to POST request. Response object body properties should be of expected type. `, async () => {
            let response = await request(app)
                .post(testRoute).send(newTestObject)

                expect(typeof response.body.author).toBe('string')
                expect(typeof response.body.title).toBe('string')
                expect(typeof response.body.category).toBe('string')
                expect(typeof response.body.text).toBe('string')
                expect(typeof response.body.status).toBe('string')
        });


        /**
         * Test response body properties for expected value.
         */
        test(`Test -> Should respond to POST request. Response object body properties should contain expected data. `, async () => {
            let response = await request(app)
                .post(testRoute).send(newTestObject)

                expect(response.body.author).toBe("TestAuthor4")
                expect(response.body.title).toBe("TestTitle4")
                expect(response.body.category).toBe("TestCategory4")
                expect(response.body.text).toBe("TestTextInput4")
                expect(response.body.status).toBe("created")
        });


        /**
         * Test POST requests for failing response status code on sending multiple of invalid request body combinations.
         */
        test(`Test -> Should respond failing to POST request due to invalid request bodies. Response status code expected to be 500. `, async () => {

            for (let object in testObjectsFailing) {
                let response = await request(app)
                    .post(testRoute).send(object)

                expect(response.statusCode).toBe(500);
            }
        });
    });



    /**
     * Test Case for PUT Requests.
     * ------------------------------
     */
    describe(`TestCase: PUT requests on route('${testRoute}').`, () => {

        /**
         * Test response status code.
         */
        test(`Test -> Should respond the PUT request on route ${testRoute}`, async () => {
            const response_GET1 = await request(app)
                .get(testRoute)

            const response_PUT = await request(app)
                .put(testRoute)
                .send(newTestObject)

            const response_GET2 = await request(app)
                .get(`${testRoute}/${response_GET1.body[0]._id}`)

            expect(response_GET1.statusCode).toEqual(200)
            expect(response_GET2.statusCode).toEqual(200)
            expect(response_PUT.statusCode).toEqual(204)
        })


        /**
         * Test response body for expected properties existence.
         */
        test(`Test -> Should respond the PUT request on route ${testRoute}`, async () => {
            const response_GET1 = await request(app)
                .get(testRoute)

            await request(app)
                .put(testRoute)
                .send(newTestObject)

            const response_GET2 = await request(app)
                .get(`${testRoute}/${response_GET1.body[0]._id}`)

            expect(response_GET2.body).toHaveProperty('_id')
            expect(response_GET2.body).toHaveProperty('author')
            expect(response_GET2.body).toHaveProperty('title')
            expect(response_GET2.body).toHaveProperty('category')
            expect(response_GET2.body).toHaveProperty('text')
            expect(response_GET2.body).toHaveProperty('status')
            expect(response_GET2.body).toHaveProperty('createdAt')
            expect(response_GET2.body).toHaveProperty('updatedAt')
        })


        /**
         * Test response body properties for expected value.
         */
        test(`Test -> Should respond the PUT request on route ${testRoute}`, async () => {
            const response_GET1 = await request(app)
                .get(testRoute)

            await request(app)
                .put(testRoute)
                .send({
                    _id: response_GET1.body[0]._id,
                    author: "TestAuthor_updated",
                    title: "TestTitle_updated",
                    category: "TestCategory_updated",
                    text: "TestTextInput_updated"
                })

            const response_GET2 = await request(app)
                .get(`${testRoute}/${response_GET1.body[0]._id}`)

            expect(response_GET2.body.author).toBe("TestAuthor_updated")
            expect(response_GET2.body.title).toBe("TestTitle_updated")
            expect(response_GET2.body.category).toBe("TestCategory_updated")
            expect(response_GET2.body.text).toBe("TestTextInput_updated")
        })
    })


    /**
     * Test Case for DELETE Requests.
     * ------------------------------
     */
    describe(`TestCase: DELETE requests on route('${testRoute}').`, () => {
        test(`Test -> Should respond to a DELETE('${testRoute}') request that returns a JSON object containing a success status code 204.`, async () => {
            const response_GET1 = await request(app)
                .get(testRoute)

            let thisID = response_GET1.body[0]._id;

            const response_DELETE = await request(app)
                .delete(testRoute)
                .send({
                    _id: `${thisID}`
                })

            expect(response_GET1.statusCode).toBe(200);
            expect(response_DELETE.statusCode).toBe(204);
        })
    })
});

















// /**
//  * Import Test Module Dependencies.
//  */
// const request = require("supertest");
// const app = require("../app");
// const testRoute = "/document";
// const testObject = {
//     author: "TestAuthor",
//     title: "TestTitle",
//     category: "TestCategory",
//     text: "TestLineOfText",
//     status: "Testing"
// }
//
//
// describe(`Test Request Routes on ${testRoute}`, () => {
//
//     /**
//      * Test GET Request on the route path.
//      */
//     describe(`Test the ${testRoute} path with GET request.`, () => {
//         test(`It should respond the GET request on route ${testRoute}`, done => {
//             request(app)
//                 .get(testRoute)
//                 .then(response => {
//                     expect(response.statusCode).toBe(200);
//                     done();
//                 });
//         });
//     });
//
//
//     /**
//      * Test for a failed GET request with false params are sent to trigger a search for ID that fails.
//      */
//     describe(`Test the ${testRoute} with a failing GET request.`, () => {
//         test(`Should respond with a error message.`, async () => {
//             const res = await request(app)
//                 .get(`${testRoute}/123`)
//
//             expect(typeof res).toBe('object');
//             expect(res.statusCode).toBe(500);
//         })
//     })
//
//
//     /**
//      * Test POST Request to add test object to database.
//      */
//     describe(`Test the ${testRoute} path with POST request.`, () => {
//         it(`Should respond the POST request on route ${testRoute}`, async () => {
//             const res = await request(app)
//                 .post(testRoute)
//                 .send(testObject)
//
//             /**
//              * Test case assertions.
//              * - assert response status code to be expected.
//              * - assert for properties existence on response object body.
//              * - assert values of properties on response object body.
//              */
//             expect(res.statusCode).toEqual(201)
//
//             expect(res.body).toHaveProperty('_id')
//             expect(res.body).toHaveProperty('author')
//             expect(res.body).toHaveProperty('title')
//             expect(res.body).toHaveProperty('category')
//             expect(res.body).toHaveProperty('text')
//             expect(res.body).toHaveProperty('status')
//             expect(res.body).toHaveProperty('createdAt')
//             expect(res.body).toHaveProperty('updatedAt')
//
//             expect(typeof res.body.author).toBe('string')
//             expect(typeof res.body.title).toBe('string')
//             expect(typeof res.body.category).toBe('string')
//             expect(typeof res.body.text).toBe('string')
//             expect(typeof res.body.status).toBe('string')
//
//             expect(res.body.author).toEqual("TestAuthor")
//             expect(res.body.title).toBe("TestTitle")
//             expect(res.body.category).toBe("TestCategory")
//             expect(res.body.text).toBe("TestLineOfText")
//
//
//             /**
//              * Remove object from test database.
//              */
//             await request(app)
//                 .delete(testRoute)
//                 .send({_id: res.body._id});
//         })
//     })
//
//
//     /**
//      * Test for a failed POST request where required fields are missing.
//      */
//     describe(`Test the ${testRoute} with a failing GET request.`, () => {
//         test(`Should respond with a error message.`, async () => {
//             const res = await request(app)
//                 .post(`${testRoute}`)
//                 .send({
//                     author: "failing test..",
//                     category: "failing test..",
//                     text: "failing test.."
//                 })
//
//             expect(typeof res).toBe('object');
//             expect(res.statusCode).toBe(500);
//         })
//     })
//
//
//     /**
//      * PUT Request expected to be failed due to no request body.
//      */
//     describe(`Test the ${testRoute} path for PUT request.`, () => {
//         it(`Should respond the PUT request on route ${testRoute}`, async () => {
//             const res_insert_object = await request(app)
//                 .post(testRoute)
//                 .send(testObject)
//
//             const res_update_object = await request(app)
//                 .put(testRoute)
//                 .send({
//                     _id: res_insert_object.body._id,
//                     author: "TestAuthor_Updated",
//                     title: "TestTitle_Updated",
//                     category: "TestCategory_Updated",
//                     text: "TestLineOfText_Updated",
//                     status: "Testing_Updated"
//                 })
//
//             const res_get_updated_object = await request(app)
//                 .get(`${testRoute}/${res_insert_object.body._id}`)
//
//             /**
//              * Test case assertions.
//              * - assert response status code to be expected.
//              * - assert for properties existence on response object body.
//              * - assert values of properties on response object body.
//              */
//             expect(res_insert_object.statusCode).toEqual(201)
//             expect(res_update_object.statusCode).toEqual(204)
//
//             // expect(res_get_updated_object.body).toHaveProperty('_id')
//             expect(res_get_updated_object.body).toHaveProperty('author')
//             expect(res_get_updated_object.body).toHaveProperty('title')
//             expect(res_get_updated_object.body).toHaveProperty('category')
//             expect(res_get_updated_object.body).toHaveProperty('text')
//             expect(res_get_updated_object.body).toHaveProperty('status')
//             expect(res_get_updated_object.body).toHaveProperty('createdAt')
//             expect(res_get_updated_object.body).toHaveProperty('updatedAt')
//
//             expect(res_get_updated_object.body.author).toEqual("TestAuthor_Updated")
//             expect(res_get_updated_object.body.title).toBe("TestTitle_Updated")
//             expect(res_get_updated_object.body.category).toBe("TestCategory_Updated")
//             expect(res_get_updated_object.body.text).toBe("TestLineOfText_Updated")
//             expect(res_get_updated_object.body.status).toBe("Testing_Updated")
//
//
//             /**
//              * Remove object from test database.
//              */
//             await request(app)
//                 .delete(testRoute)
//                 .send({_id: res_insert_object.body._id});
//         })
//     })
//
//
//     describe(`Test the ${testRoute} path for DELETE request.`, () => {
//         it(`Should respond the POST request on route ${testRoute}`, async () => {
//             const res1 = await request(app)
//                 .post(testRoute)
//                 .send(testObject)
//
//             const res2 = await request(app)
//                 .delete(testRoute)
//                 .send({
//                     _id: `${res1.body._id}`
//                 })
//
//
//             /**
//              * Test case assertions.
//              * - assert that the object we want to remove have been successfully added to database by status code 201.
//              * - assert the status code for delete matches expected.
//              * -
//              */
//             expect(res1.statusCode).toEqual(201)
//             expect(res2.statusCode).toBe(204);
//         })
//     })
// });
