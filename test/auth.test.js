const request = require('supertest');
const app = require('../src/server').app;

const time = new Date().getTime();

beforeAll(async () => {
    // Create a test user for signup and login tests
    await request(app)
        .post('/signup')
        .send({
            email: `testuser-${time}@gmail.com`,
            password: 'testpassword',
            "firstName": "Jemin Cool",
            "lastName": "Patel",
            "mobile": "+91123456789",
            "birthDate": "1992-05-21",
            "country": "IN",
            "state": "GJ",
            "address": "Dungri"
        })
        .expect(200);
});


describe('POST /login', () => {

    test('Login user with valid password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: `testuser-${time}@gmail.com`,
                password: `testpassword`
            })
            .expect(200);

        expect(res.body.token != undefined).toBe(true);
    });

    test('Login user with invalid password', async () => {
        const res = await request(app)
            .post('/login')
            .send({
                email: `testuser-${time}@gmail.com`,
                password: `testpassword11`
            })
            .expect(401);

        expect(res.body.message == 'Email or password is incorrect').toBe(true);
    });


    test('Login user with empty email and password', async () => {
        const res = await request(app)
            .post('/login')
            .send({})
            .expect(400);

        expect(res.body.message == 'Email and password are required').toBe(true);
    });
});
