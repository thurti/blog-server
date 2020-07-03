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

    describe('GET /:id', () => {

        it('returns html with request id', (done) => {
            request(app)
                .get('/42')
                .expect('content-type', /html/)
                .expect(200, done);
        });
    });
});