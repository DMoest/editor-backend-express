/**
 * Import Test Module Dependencies.
 */
const request = require("supertest");
const app = require("../../app");



/**
 * Test the root/index path.
 */
describe("Test the root/index path", () => {
    test("It should response the GET method", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.data.msg).toBe('Hello World');
                done();
            });
    });
});


describe("Test the root/index path ", () => {
    test("It should response the POST method", done => {
        request(app)
            .post("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.body.data.msg).toBe('OK');
                done();
            });
    });
});
