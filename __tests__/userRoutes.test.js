/**
 * Import Test Module Dependencies.
 */
const request = require("supertest");
const app = require("../app");
const testRoute = "/user";
const testObject = {
    firstname: "TestPersonFirstname",
    lastname: "TestPersonLastname",
    phone: "1010101010",
    email: "Test@TestExample.email",
    street: "TestStreetAdress",
    streetnr: "TestStreetNumber",
    postnr: "11010",
    city: "TestCity",
    country: "TestCountry"
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
             * - assert value type of properties on response body.
             * - assert values of properties on response object body.
             */
            expect(res.statusCode).toEqual(201)

            expect(res.body).toHaveProperty('_id')
            expect(res.body).toHaveProperty('firstname')
            expect(res.body).toHaveProperty('lastname')
            expect(res.body.contact).toHaveProperty('phone')
            expect(res.body.contact).toHaveProperty('email')
            expect(res.body.adress).toHaveProperty('street')
            expect(res.body.adress).toHaveProperty('streetnr')
            expect(res.body.adress).toHaveProperty('postnr')
            expect(res.body.adress).toHaveProperty('city')
            expect(res.body.adress).toHaveProperty('country')
            expect(res.body).toHaveProperty('status')
            expect(res.body).toHaveProperty('createdAt')
            expect(res.body).toHaveProperty('updatedAt')

            expect(typeof res.body.firstname).toBe('string')
            expect(typeof res.body.lastname).toBe('string')
            expect(typeof res.body.contact.phone).toBe('number')
            expect(typeof res.body.contact.email).toBe('string')
            expect(typeof res.body.adress.street).toBe('string')
            expect(typeof res.body.adress.streetnr).toBe('string')
            expect(typeof res.body.adress.postnr).toBe('number')
            expect(typeof res.body.adress.city).toBe('string')
            expect(typeof res.body.adress.country).toBe('string')
            expect(typeof res.body.status).toBe('string')

            expect(res.body.firstname).toEqual("TestPersonFirstname")
            expect(res.body.lastname).toBe("TestPersonLastname")
            expect(res.body.contact.phone).toBe(1010101010)
            expect(res.body.contact.email).toBe("Test@TestExample.email")
            expect(res.body.adress.street).toBe("TestStreetAdress")
            expect(res.body.adress.streetnr).toBe("TestStreetNumber")
            expect(res.body.adress.postnr).toBe(11010)
            expect(res.body.adress.city).toBe("TestCity")
            expect(res.body.adress.country).toBe("TestCountry")
            expect(res.body.status).toBe("created")


            /**
             * Remove object from test database.
             */
            await request(app)
                .delete(testRoute)
                .send({_id: res.body._id});
        })
    })


    /**
     * Test for a failed GET request false params are sent to trigger a search for ID.
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
     * Test PUT Request for updating objects in database.
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
                    firstname: "TestPersonFirstname_Updated",
                    lastname: "TestPersonLastname_Updated",
                    phone: "1111111111",
                    email: "Test@TestExample.email_Updated",
                    street: "TestStreetAdress_Updated",
                    streetnr: "TestStreetNumber_Updated",
                    postnr: "11111",
                    city: "TestCity_Updated",
                    country: "TestCountry_Updated"
                })


            const res_get_updated_object = await request(app)
                .get(`${testRoute}/${res_insert_object.body._id}`)

            console.log("res_get_updated_object.statusCode: ", res_get_updated_object.statusCode)
            console.log("res_get_updated_object.body: ", res_get_updated_object.body)

            /**
             * Test case assertions.
             * - assert response status code to be expected.
             * - assert for properties existence on response object body.
             * - assert values of properties on response object body.
             */
            expect(res_insert_object.statusCode).toEqual(201)
            expect(res_update_object.statusCode).toEqual(204)

            expect(res_get_updated_object.body).toHaveProperty('_id')
            expect(res_get_updated_object.body).toHaveProperty('firstname')
            expect(res_get_updated_object.body).toHaveProperty('lastname')
            expect(res_get_updated_object.body.contact).toHaveProperty('phone')
            expect(res_get_updated_object.body.contact).toHaveProperty('email')
            expect(res_get_updated_object.body.adress).toHaveProperty('street')
            expect(res_get_updated_object.body.adress).toHaveProperty('streetnr')
            expect(res_get_updated_object.body.adress).toHaveProperty("postnr")
            expect(res_get_updated_object.body.adress).toHaveProperty("city")
            expect(res_get_updated_object.body.adress).toHaveProperty("country")
            expect(res_get_updated_object.body).toHaveProperty("status")
            expect(res_get_updated_object.body).toHaveProperty('createdAt')
            expect(res_get_updated_object.body).toHaveProperty('updatedAt')


            /**
             * Remove object from test database.
             */
            await request(app)
                .delete(testRoute)
                .send({_id: res_insert_object.body._id});
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
                    lastname: "failing test..",
                    email: "failing test.."
                })

            expect(typeof res).toBe('object');
            expect(res.statusCode).toBe(500);
        })
    })


    describe(`Test the ${testRoute} path for DELETE request.`, () => {
        it(`Should respond the POST request on route ${testRoute}`, async () => {
            const res1 = await request(app)
                .post(testRoute)
                .send(testObject)

            let thisID = res1.body._id;

            const res2 = await request(app)
                .delete(testRoute)
                .send({
                    _id: `${thisID}`
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
