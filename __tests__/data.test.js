/**
 * Import Test Module Dependencies.
 */
const request = require("supertest");
const app = require("../app");
const testRoute = "/data";


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
                    // expect(response.body.data.msg).toBe('Hello World');
                    done();
                });
        });
    });


    /**
     * POST Request expected to be failed due to no request body.
     */
    describe(`Test the ${testRoute} path with POST request.`, () => {
        it(`Should respond the POST request on route ${testRoute}`, async () => {
            const res = await request(app)
                .post(testRoute)
                .send({
                    namn: "Testperson",
                    bor: "Testcity",
                    adress: "Teststreet",
                    info: "Testinformation"
                })

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

            expect(res.body.namn).toEqual("Testperson")
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
     * PUT Request expected to be failed due to no request body.
     */
    describe(`Test the ${testRoute} path for PUT request.`, () => {
        it(`Should respond the PUT request on route ${testRoute}`, async () => {
            const res1 = await request(app)
                .post(testRoute)
                .send({
                    namn: "Testperson",
                    bor: "Testcity",
                    adress: "Teststreet",
                    info: "Testinformation"
                })

            const res2 = await request(app)
                .put(testRoute)
                .send({
                    _id: res1.body._id,
                    namn: "Testperson_updated",
                    bor: "Testcity_updated",
                    adress: "Teststreet_updated",
                    info: "Testinformation_updated"
                })

            console.log('res1.body', res1.body);
            console.log('res2.body', res2.body);

            /**
             * Test case assertions.
             * - assert response status code to be expected.
             * - assert for properties existence on response object body.
             * - assert values of properties on response object body.
             */
            expect(res1.statusCode).toEqual(201)
            expect(res2.statusCode).toEqual(204)

            expect(res2.body).toHaveProperty('_id')
            expect(res2.body).toHaveProperty('namn')
            expect(res2.body).toHaveProperty('bor')
            expect(res2.body).toHaveProperty('adress')
            expect(res2.body).toHaveProperty('info')
            expect(res2.body).toHaveProperty('createdAt')
            expect(res2.body).toHaveProperty('updatedAt')

            expect(res2.body.namn).toEqual("Testperson_updated")
            expect(res2.body.bor).toBe("Testcity_updated")
            expect(res2.body.adress).toBe("Teststreet_updated")
            expect(res2.body.info).toBe("Testinformation_updated")


            /**
             * Remove object from test database.
             */
            await request(app)
                .delete(testRoute)
                .send({_id: res.body._id});
        })
    })
});
