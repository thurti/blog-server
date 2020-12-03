process.env.POSTS = `${__dirname}/../fixtures/testfiles`;

import express from 'express';
import request from 'supertest';
import apiRoutes from '../../src/routes/api';

const app = express();
app.use('/', apiRoutes);

describe('routes/api.ts', () => {

    describe('GET /', () => {

        it('returns json', (done) => {
            request(app)
                .get('/')
                .expect('content-type', /json/)
                .expect(200, done);
        });
    });

    describe('GET /:slug', () => {

        it('returns json with request slug', (done) => {
            request(app)
                .get('/my-best-post')
                .expect('content-type', /json/)
                .expect(/test 2/)
                .expect(/Test 2 Content/)
                .expect(200, done);
        });
    });

    describe('GET /tag/:tag', () => {

        it('returns json', (done) => {
            request(app)
                .get('/tag/css')
                .expect('content-type', /json/)
                .expect(/test 1/)
                .expect(200, done);
        });
    });
});