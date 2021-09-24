/**
 * Import Test Module Dependencies.
 */
const request = require("supertest");
const app = require("../../app");
const testRoute = "/document";
const testObject = {
    author: "TestAuthor",
    title: "TestTitle",
    category: "TestCategory",
    text: "TestLineOfText",
    status: "Testing"
}


describe(`Test Request Routes on ${testRoute}`, () => {

    /**
     * Test GET Request on the route path.
     */
    describe(`Test the ${testRoute} path with GET request.`, () => {
        test(`It should respond the GET request on route ${testRoute}`, done => {
            request(app)
                .get(testRoute)
                .then(response => {
                    expect(response.statusCode).toBe(200);
                    done();
                });
        });
    });


    /**
     * Test for a failed GET request with false params are sent to trigger a search for ID that fails.
     */
    describe(`Test the ${testRoute} with a failing GET request.`, () => {
        test(`Should respond with a error message.`, async () => {
            const res = await request(app)
                .get(`${testRoute}/123`)

            expect(typeof res).toBe('object');
            expect(res.statusCode).toBe(500);
        })
    })


    /**
     * Test POST Request to add test object to database.
     */
    describe(`Test the ${testRoute} path with POST request.`, () => {
        it(`Should respond the POST request on route ${testRoute}`, async () => {
            const res = await request(app)
                .post(testRoute)
                .send(testObject)

            /**
             * Test case assertions.
             * - assert response status code to be expected.
             * - assert for properties existence on response object body.
             * - assert values of properties on response object body.
             */
            expect(res.statusCode).toEqual(201)

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('author')
            expect(res.body).toHaveProperty('title')
            expect(res.body).toHaveProperty('category')
            expect(res.body).toHaveProperty('text')
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('createdAt')
            expect(res.body).toHaveProperty('updatedAt')

            expect(typeof res.body.author).toBe('string')
            expect(typeof res.body.title).toBe('string')
            expect(typeof res.body.category).toBe('string')
            expect(typeof res.body.text).toBe('string')
            expect(typeof res.body.status).toBe('string')

            expect(res.body.author).toEqual("TestAuthor")
            expect(res.body.title).toBe("TestTitle")
            expect(res.body.category).toBe("TestCategory")
            expect(res.body.text).toBe("TestLineOfText")


            /**
             * Remove object from test database.
             */
            await request(app)
                .delete(testRoute)
                .send({_id: res.body._id});
        })
    })


    /**
     * Test for a failed POST request where required fields are missing.
     */
    describe(`Test the ${testRoute} with a failing GET request.`, () => {
        test(`Should respond with a error message.`, async () => {
            const res = await request(app)
                .post(`${testRoute}`)
                .send({
                    author: "failing test..",
                    category: "failing test..",
                    text: "failing test.."
                })

            expect(typeof res).toBe('object');
            expect(res.statusCode).toBe(500);
        })
    })


    /**
     * PUT Request expected to be failed due to no request body.
     */
    describe(`Test the ${testRoute} path for PUT request.`, () => {
        it(`Should respond the PUT request on route ${testRoute}`, async () => {
            const res_insert_object = await request(app)
                .post(testRoute)
                .send(testObject)

            const res_update_object = await request(app)
                .put(testRoute)
                .send({
                    _id: res_insert_object.body._id,
                    author: "TestAuthor_Updated",
                    title: "TestTitle_Updated",
                    category: "TestCategory_Updated",
                    text: "TestLineOfText_Updated",
                    status: "Testing_Updated"
                })

            const res_get_updated_object = await request(app)
                .get(`${testRoute}/${res_insert_object.body._id}`)

            /**
             * Test case assertions.
             * - assert response status code to be expected.
             * - assert for properties existence on response object body.
             * - assert values of properties on response object body.
             */
            expect(res_insert_object.statusCode).toEqual(201)
            expect(res_update_object.statusCode).toEqual(204)

            // expect(res_get_updated_object.body).toHaveProperty('_id')
            expect(res_get_updated_object.body).toHaveProperty('author')
            expect(res_get_updated_object.body).toHaveProperty('title')
            expect(res_get_updated_object.body).toHaveProperty('category')
            expect(res_get_updated_object.body).toHaveProperty('text')
            expect(res_get_updated_object.body).toHaveProperty('status')
            expect(res_get_updated_object.body).toHaveProperty('createdAt')
            expect(res_get_updated_object.body).toHaveProperty('updatedAt')

            expect(res_get_updated_object.body.author).toEqual("TestAuthor_Updated")
            expect(res_get_updated_object.body.title).toBe("TestTitle_Updated")
            expect(res_get_updated_object.body.category).toBe("TestCategory_Updated")
            expect(res_get_updated_object.body.text).toBe("TestLineOfText_Updated")
            expect(res_get_updated_object.body.status).toBe("Testing_Updated")


            /**
             * Remove object from test database.
             */
            await request(app)
                .delete(testRoute)
                .send({_id: res_insert_object.body._id});
        })
    })


    describe(`Test the ${testRoute} path for DELETE request.`, () => {
        it(`Should respond the POST request on route ${testRoute}`, async () => {
            const res1 = await request(app)
                .post(testRoute)
                .send(testObject)

            const res2 = await request(app)
                .delete(testRoute)
                .send({
                    _id: `${res1.body._id}`
                })


            /**
             * Test case assertions.
             * - assert that the object we want to remove have been successfully added to database by status code 201.
             * - assert the status code for delete matches expected.
             * -
             */
            expect(res1.statusCode).toEqual(201)
            expect(res2.statusCode).toBe(204);
        })
    })
});
