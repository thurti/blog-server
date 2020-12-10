process.env.POSTS = `${__dirname}/../fixtures/testfiles`;

import express from 'express';
import request from 'supertest';
import ssrRoutes from '../../src/routes/ssr';
const app = express();
app.use('/', ssrRoutes);

describe('routes/ssr.ts', () => {

    describe('GET /', () => {

        it('returns json', (done) => {
            request(app)
                .get('/')
                .expect('content-type', /html/)
                .expect(/test 1/)
                .expect(/test 2/)
                .expect(200, done);
        });
    });

    describe('GET /about', () => {

        it('returns html page "About"', (done) => {
            request(app)
                .get('/about')
                .expect('content-type', /html/)
                .expect(/Thomas/)
                .expect(200, done);
        });
    });

    describe('GET /:slug', () => {

        it('returns html for requested slug', (done) => {
            request(app)
                .get('/my-best-post')
                .expect('content-type', /html/)
                .expect(/test 2/)
                .expect(/Test 2 Content/)
                .expect(200, done);
        });

        it('returns 404 if no post found', (done) => {
            request(app)
                .get('/asd')
                .expect('content-type', /html/)
                .expect(404, done);
        });
    });

    describe('GET /tag/:tag', () => {

        it('returns html list for requested tag', (done) => {
            request(app)
                .get('/tag/css')
                .expect('content-type', /html/)
                .expect(/test 1/)
                .expect(200, done);
        });
    });
});