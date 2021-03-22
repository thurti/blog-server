import { BrowserDetectInfo } from "browser-detect/dist/types/browser-detect.interface";
import { Request, Response } from "express";
import { readFileSync } from "fs";
import path from "path";
import config from '../config';
import PostDirReader from "../lib/PostDirReader";
import SvelteRenderer from '../lib/SvelteRenderer';
import Posts from "../model/Posts";
import { SSRRouteParameter } from "../types/SSRRouteParameter";

const reader = new PostDirReader(config.POSTS);
const posts = new Posts(reader);

const frontend_index = readFileSync(path.resolve(config.FRONTEND_INDEX)).toString();
const frontend_index_noscript = readFileSync(path.resolve(config.FRONTEND_INDEX_NOSCRIPT)).toString();
const App = require(path.resolve(config.FRONTEND_APP));
const svelteRenderer = new SvelteRenderer(App, frontend_index);

/**
 * If browser version is >= config.BROWSERS, returns frontend_index
 * else frontend_index_noscript
 * @param browser 
 * @returns 
 */
function getHtmlTemplateForBrowser(browser: BrowserDetectInfo): string {
  if (
    browser?.name &&
    browser?.versionNumber &&
    config.BROWSERS[browser.name]
  ) {
    if (browser.versionNumber >= config.BROWSERS[browser.name]) {
      return frontend_index;
    } else {
      console.log("noscript");
      return frontend_index_noscript;
    }
  } else {
    //maybe
    return frontend_index;
  }
}

export async function getStaticView(req: Request, res: Response, params: SSRRouteParameter): Promise<Response> {
  try {
    const html_template = getHtmlTemplateForBrowser(res.locals.browser);
    svelteRenderer.setHtmlTemplate(html_template);
    const html = svelteRenderer.render(params.view, req.params);
    return res.send(html);
  } catch (error) {
    const html = svelteRenderer.render('NotFound', req.params, {
      error: error
    });
    return res.status(404).send(html);
  }
}

export async function getList(req: Request, res: Response, params: SSRRouteParameter): Promise<Response> {
  try {
    const html_template = getHtmlTemplateForBrowser(res.locals.browser);
    svelteRenderer.setHtmlTemplate(html_template);

    req.params.title = params.title ?? '';
    
    const post = await posts.getByTag(params.tag ?? '');
    const html = svelteRenderer.render(params.view, req.params, post);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function getSingle(req: Request, res: Response, params: SSRRouteParameter): Promise<Response> {
  try {
    const html_template = getHtmlTemplateForBrowser(res.locals.browser);
    svelteRenderer.setHtmlTemplate(html_template);

    const post = await posts.getBySlug(req.params.slug);
    const html = svelteRenderer.render(params.view, req.params, post);
    return res.send(html);
  } catch (error) {
    const html = svelteRenderer.render('NotFound', req.params, {
      error: error
    });
    return res.status(404).send(html);
  }
}

export async function getPostsByTag(req: Request, res: Response): Promise<Response> {
  try {
    const html_template = getHtmlTemplateForBrowser(res.locals.browser);
    svelteRenderer.setHtmlTemplate(html_template);

    req.params.title = "Tag";
    req.params.slug = req.params.tag;

    const post = await posts.getByTag(req.params.tag);
    const html = svelteRenderer.render('Tag', req.params, post);
    return res.send(html);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}