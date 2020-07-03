import Posts from '../../src/model/Posts';
import { strict as assert } from 'assert';
import PostDirReader from '../../src/lib/PostDirReader';

describe('model/Posts.ts', () => {

    const files_fixture = require('../fixtures/parsedFilesArray');
    const readerStub = <PostDirReader>{getPosts: async () => files_fixture};
    const posts = new Posts(readerStub);
    
    it('creates new instance', () => {
        assert(posts instanceof Posts);
    });

    describe('Posts.all()', () => {
        
        it('returns array of published posts', async () => {
            const all = await posts.all();
            assert.equal(all.length, 2);
            assert.equal(all[0].published, true);
            assert.equal(all[1].published, true);
        });
    
        it('returns array sorted by date', async () => {
            const all = await posts.all();
            const date1 = new Date(all[0].created_at);
            const date2 = new Date(all[1].created_at);
            assert(date1 > date2);
        });
    
        it('does not contain content', async () => {
            const all = await posts.all();
            assert(all[0].content === undefined);
        });

        it('does contain teaser text', async () => {
            const all = await posts.all();
            assert(all[1].teaser === 'teaser 1');
        })
    
    });

    describe('Posts.getBySlug()', () => {
        
        it('returns single post', async () => {
            const post = await posts.getBySlug('my-best-post');
            assert.equal(post.slug, 'my-best-post');
            assert.equal(post.title, 'test 2');
            assert.equal(post.content, 'hello 2');
        });
    
        it('does not return unpublished post', async () => {
            const post = await posts.getBySlug('not-published');
            assert.equal(post, undefined);
        });
    });
});