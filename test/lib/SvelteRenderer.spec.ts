import sinon from 'sinon';
import {strict as assert} from 'assert';
import SvelteRenderer from '../../src/lib/SvelteRenderer';
import { readFileSync } from 'fs';

const svelteRenderResult = {
  html: 'rendered_html',
  css: {code: 'rendered_css'},
  head: 'rendered_head',
};

const AppMock = {
  render: sinon.stub().returns(svelteRenderResult)
};
const index_file = readFileSync('./test/fixtures/index_ssr.html').toString();

describe('SvelteRenderer', () => {

  let renderer: SvelteRenderer;

  before(() => {
    renderer = new SvelteRenderer(AppMock, index_file);
  })

  
  it('creates instance with properties', () => {
    assert.strictEqual(renderer.view, AppMock);
    assert.strictEqual(renderer.html, index_file);
  });

  it('#renderView() calls app.render function with props', () => {
    renderer.renderView('myview', {slug: 'test'}, {title: 'test'});

    assert(AppMock.render.calledOnceWith({
      ssr: true,
      viewname: 'myview',
      params: {slug: 'test'},
      prepopulate_content: {title: 'test'}
    }));
  });

  it('#renderApp() returns render object', () => {
    const result = renderer.renderView('myview', {slug: 'test'}, {title: 'test'});
    assert.deepStrictEqual(result, {
      html: 'rendered_html',
      head: 'rendered_head',
      css: {code: 'rendered_css'}
    });
  });

  it('#replaceHtmlPlaceholder() replaces placeholder with svelte results', () => {
    const result = renderer.replaceHtmlPlaceholder({
      html: 'rendered_html',
      head: 'rendered_head',
      css: {code: 'rendered_css'}
    });

    assert.deepStrictEqual(result, "rendered_head\nrendered_css\nrendered_html");
  });

  it('#render() returns rendered html string', () => {
    const renderSpy = sinon.spy(renderer, "renderView");
    const replaceHtmlSpy = sinon.spy(renderer, "replaceHtmlPlaceholder");
    const result = renderer.render('testview', {slug: 'wtf'}, {title: 'yes'});

    assert(renderSpy.calledOnceWith('testview', {slug: 'wtf'}, {title: 'yes'}));
    assert(replaceHtmlSpy.calledOnceWith(svelteRenderResult));
    assert.deepStrictEqual(result, "rendered_head\nrendered_css\nrendered_html");
  });
});