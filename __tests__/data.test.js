/**
 * Import Test Module Dependencies.
 */
const request = require("supertest");
const app = require("../app");
const testRoute = "/data";
const testObject = {
    namn: "Testperson",
    bor: "Testcity",
    adress: "Teststreet",
    info: "Testinformation"
};


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
            expect(res.body).toHaveProperty('namn')
            expect(res.body).toHaveProperty('bor')
            expect(res.body).toHaveProperty('adress')
            expect(res.body).toHaveProperty('info')
            expect(res.body).toHaveProperty('createdAt')
            expect(res.body).toHaveProperty('updatedAt')

            expect(typeof res.body.namn).toBe('string')
            expect(typeof res.body.bor).toBe('string')
            expect(typeof res.body.adress).toBe('string')
            expect(typeof res.body.info).toBe('string')

            expect(res.body.namn).toBe("Testperson")
            expect(res.body.bor).toBe("Testcity")
            expect(res.body.adress).toBe("Teststreet")
            expect(res.body.info).toBe("Testinformation")

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
                    namn: "failing test..",
                    adress: "failing test..",
                    info: "failing test.."
                })

            expect(typeof res).toBe('object');
            expect(res.statusCode).toBe(500);
        })
    })


    /**
     * Test PUT Request .
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
                    namn: "Testperson_updated",
                    bor: "Testcity_updated",
                    adress: "Teststreet_updated",
                    info: "Testinformation_updated"
                })

            console.log("res_update_object.statusCode: ", res_update_object.statusCode)

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

            expect(res_get_updated_object.body).toHaveProperty('_id')
            expect(res_get_updated_object.body).toHaveProperty('namn')
            expect(res_get_updated_object.body).toHaveProperty('bor')
            expect(res_get_updated_object.body).toHaveProperty('adress')
            expect(res_get_updated_object.body).toHaveProperty('info')
            expect(res_get_updated_object.body).toHaveProperty('createdAt')
            expect(res_get_updated_object.body).toHaveProperty('updatedAt')

            expect(res_get_updated_object.body.namn).toEqual("Testperson_updated")
            expect(res_get_updated_object.body.bor).toBe("Testcity_updated")
            expect(res_get_updated_object.body.adress).toBe("Teststreet_updated")
            expect(res_get_updated_object.body.info).toBe("Testinformation_updated")


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
            expect(res1.statusCode).toBe(201);
            expect(res2.statusCode).toBe(204);
        })
    })
});
