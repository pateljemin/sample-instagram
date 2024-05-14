const request = require('supertest');
const app = require('../src/server').app;

let token;
let postId;
const time = new Date().getTime();

beforeAll(async () => {
    // Create a test user for signup and login tests
    await request(app)
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

    // Get a token for the test user for authenticated tests
    const loginRes = await request(app)
        .post('/login')
        .send({ email: `jemin-${time}@insta.com`, password: 'Jemin@123' })
        .expect(200);

    token = loginRes.body.token;
});


describe('Posts API', () => {

    describe('POST /posts', () => {
        test('should create a new post', async () => {
            const post = {
                "medias": [{
                    "type": "TEXT",
                    "content": "Sample Post"
                },
                {
                    "type": "IMAGE",
                    "content": "https://fast.com/1"
                }
                ]
            };
            const res = await request(app)
                .post('/post')
                .set('Authorization', token)
                .send(post)
                .expect(200);
            postId = res.body.postId;
            expect(res.body.postId).toBeDefined();
        });

        test('should not create a new post with missing data', async () => {
            const post = {};
            const res = await request(app)
                .post('/post')
                .set('Authorization', token)
                .send(post)
                .expect(400);
            expect(res.body.message).toBe('Missing content');
        });
    });

    describe('PUT /post/:id', () => {
        test('should update a post by id', async () => {
            const post = {
                "medias": [{
                    "type": "TEXT",
                    "content": "Sample Post updated"
                },
                {
                    "type": "IMAGE",
                    "content": "https://fast.com/updated"
                }
                ]
            };
            const res = await request(app)
                .put(`/post/${postId}`)
                .set('Authorization', token)
                .send(post)
                .expect(200);

            expect(res.body.id).toBe(postId);
        });

        test('should not update a new post with missing data', async () => {
            const post = {};
            const res = await request(app)
                .put(`/post/${postId}`)
                .set('Authorization', token)
                .send(post)
                .expect(400);
            expect(res.body.message).toBe('Missing content');
        });
    });

    describe('GET /post', () => {
        test('should return an array of posts', async () => {
            const res = await request(app)
                .get('/post')
                .set('Authorization', token)
                .expect(200);

            expect(res.body).toBeDefined();
        });
    });

    describe('GET /post/:id', () => {
        test('should return a post by id', async () => {
            const res = await request(app)
                .get(`/post/${postId}`)
                .set('Authorization', token)
                .expect(200);
            expect(res.body.post.id).toBe(postId);
        });

        test('should not return a post by invalid id', async () => {
            const res = await request(app)
                .get(`/post/-1`)
                .set('Authorization', token)
                .expect(404);

            expect(res.body.message).toBe('Invalid Id');
        });
    });

    describe('DELETE /post/:id', () => {
        test('should delete a post by id', async () => {
            await request(app)
                .delete(`/post/${postId}`)
                .set('Authorization', token)
                .expect(204);
            // Verify that the post has been deleted
            const res = await request(app)
                .delete(`/post/${postId}`)
                .set('Authorization', token)
                .expect(404);

            expect(res.body.message).toBe('Invalid Id');
        });
    });
});
