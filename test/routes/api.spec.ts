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

    describe('GET /:id', () => {

        it('returns json with request id', (done) => {
            request(app)
                .get('/42')
                .expect('content-type', /json/)
                .expect(200, done);
        });
    });
});