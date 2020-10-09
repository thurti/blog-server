process.env.POSTS = `${__dirname}/../fixtures/testfiles`;

import express from 'express';
import request from 'supertest';
import webRoutes from '../../src/routes/web90s';

const app = express();
app.use('/90s', webRoutes);

describe('routes/web.ts', () => {

    describe('GET /90s', () => {

        it('returns html', (done) => {
            request(app)
                .get('/90s/')
                .expect('content-type', /html/)
                .expect(200, done);
        });
    });

    describe('GET /90s/:slug', () => {

        it('returns html with request slug', (done) => {
            request(app)
                .get('/90s/my-best-post')
                .expect('content-type', /html/)
                .expect(/Test 2 Content/)
                .expect(200, done);
        });
    });

    describe('GET /90s/tag/:tag', () => {

        it('returns html', (done) => {
            request(app)
                .get('/90s/tag/js')
                .expect('content-type', /html/)
                .expect(200, done);
        });
    });
});