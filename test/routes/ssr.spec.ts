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

    describe('GET /articles', () => {

        it('returns html list with articles', (done) => {
            request(app)
                .get('/articles')
                .expect('content-type', /html/)
                .expect(/test 1/)
                .expect(/test 4/)
                .expect(200, done);
        });
    });

    describe('GET /articles/:slug', () => {

        it('returns html for requested article', (done) => {
            request(app)
                .get('/articles/my-best-post')
                .expect('content-type', /html/)
                .expect(/test 2/)
                .expect(/Test 2 Content/)
                .expect(200, done);
        });

        it('returns 404 if no post found', (done) => {
            request(app)
                .get('/articles/asd')
                .expect('content-type', /html/)
                .expect(404, done);
        });
    });

    describe('GET /portfolio', () => {

        it('returns html list with portfolio', (done) => {
            request(app)
                .get('/portfolio')
                .expect('content-type', /html/)
                .expect(/test 2/)
                .expect(200, done);
        });
    });

    describe('GET /portfolio/:slug', () => {

        it('returns html for requested portfolio', (done) => {
            request(app)
                .get('/portfolio/my-best-post')
                .expect('content-type', /html/)
                .expect(/test 2/)
                .expect(/Test 2 Content/)
                .expect(200, done);
        });

        it('returns 404 if no post found', (done) => {
            request(app)
                .get('/portfolio/asd')
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

    describe('GET /asd', () => {

        it('returns 404 Not Found', (done) => {
            request(app)
                .get('/asd')
                .expect('content-type', /html/)
                .expect(/404 - Page Not Found/)
                .expect(404, done);
        });
    });
});