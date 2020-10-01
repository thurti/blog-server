process.env.POSTS = `${__dirname}/../fixtures/testfiles`;

import express from 'express';
import request from 'supertest';
import webRoutes from '../../src/routes/web';

const app = express();
app.use('/', webRoutes);

describe('routes/web.ts', () => {

    describe('GET /', () => {

        it('returns html', (done) => {
            request(app)
                .get('/')
                .expect('content-type', /html/)
                .expect(200, done);
        });
    });

    describe('GET /:slug', () => {

        it('returns html with request slug', (done) => {
            request(app)
                .get('/my-best-post')
                .expect('content-type', /html/)
                .expect(/Test 2 Content/)
                .expect(200, done);
        });
    });

    describe('GET /tag/:tag', () => {

        it('returns html', (done) => {
            request(app)
                .get('/tag/js')
                .expect('content-type', /html/)
                .expect(200, done);
        });
    });
});