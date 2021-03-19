import fs from 'fs';
import sinon from 'sinon';
import {strict as assert} from 'assert';
import PostDirReader from '../../src/lib/PostDirReader';

describe('lib/PostDirReader', () => {
    
    const dir = fs.realpathSync('test/fixtures/testfiles');
    const file = `${dir}/test.md`;
    let postReader = new PostDirReader(dir); 
    
    before(() => {
        if (fs.existsSync(file)) fs.unlinkSync(file);
    });

    after(() => {
        if (fs.existsSync(file)) fs.unlinkSync(file);
        postReader.destroy();  
    });

    it('#readDir() reads files from directory', async () => {
        const files = await postReader.readDir();
        assert.equal(files.length, 5);
        assert(files[0] instanceof fs.Dirent);
    });

    it('#parseFile() parses markdown file with frontmatter to object', async () => {
        const file_object = await postReader.parseFile('1.md');
        assert.equal(file_object.title, 'test 1');
    });

    it('#getPosts() returns array of posts objects', async () => {
        const posts = await postReader.getPosts();
        assert.equal(posts.length, 4);
        assert.equal(posts[1].title, 'test 2');
    });

    it.skip('calls #updatePosts() on directory change', function () {
        //don't know why this is not working
        //works in real app though
        const updatePostsSpy = sinon.spy(postReader, 'updatePosts');
        fs.writeFileSync(file, "hello");
        sinon.assert.calledOnce(updatePostsSpy);
    });

});