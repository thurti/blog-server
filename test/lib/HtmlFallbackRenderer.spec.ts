process.env.POSTS = `${__dirname}/../fixtures/testfiles`;

import {strict as assert} from 'assert';
import {renderPostList, renderSinglePost} from '../../src/lib/HtmlFallbackRenderer';

describe('lib/HtmlFallbackRenderer', () => {

  const files_fixture = require('../fixtures/parsedFilesArray');

  it('Renders Posts Listing', async () => {
    const html = await renderPostList(files_fixture);
    assert.match(html, /teaser 1/);
    assert.match(html, /teaser 2/);
    assert.match(html, /teaser 3/);
  });
  

  it('Renders Single Post', async () => {
    const html = await renderSinglePost(files_fixture[1]);
    assert.match(html, /test 2/);
    assert.match(html, /hello 2/);
  });
  
});