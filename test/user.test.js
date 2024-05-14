const request = require('supertest');
const app = require('../src/server').app;
const time = new Date().getTime();

describe('POST /signup', () => {
    test('create user with invalid body', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                firstName: `firstName${time}`,
            })
            .expect(400);

        expect(res.body.message == 'Please provide all the required fields').toBe(true);
    });

    test('create user', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                "email": `jemin-${time}@insta.com`,
                "password": "Jemin@123",
                "firstName": "Jemin Cool",
                "lastName": "Patel",
                "mobile": "+91123456789",
                "birthDate": "1992-05-21",
                "country": "IN",
                "state": "GJ",
                "address": "Dungri"
            })
            .expect(200);

        expect(res.body.message == 'User created').toBe(true);
    });

    test('user already exist', async () => {
        const res = await request(app)
            .post('/signup')
            .send({
                "email": `jemin-${time}@insta.com`,
                "password": "Jemin@123",
                "firstName": "Jemin Cool",
                "lastName": "Patel",
                "mobile": "+91123456789",
                "birthDate": "1992-05-21",
                "country": "IN",
                "state": "GJ",
                "address": "Dungri"
            })
            .expect(409);

        expect(res.body.message == 'Email is already exist').toBe(true);
    });
});

describe('POST /forget-password', () => {

    test('Forget password', async () => {
        await request(app)
            .get(`/forget-password?email=testuser-${time}@gmail.com`)
            .expect(200);
    });

    test('Forget password without email', async () => {
        const res = await request(app)
            .get('/forget-password')
            .expect(400);
    });
});

describe('POST /change-password', () => {

    test('Change password', async () => {
        const loginRes = await request(app)
            .post('/login')
            .send({
                email: `jemin-${time}@insta.com`,
                password: `Jemin@123`
            });
        const res = await request(app)
            .post('/change-password')
            .send({
                token: loginRes.body.token,
                password: "Abcd@123"
            })
            .expect(200);
    });


    test('Change password without info', async () => {
        const res = await request(app)
            .post('/change-password')
            .send({})
            .expect(400);
    });
});
